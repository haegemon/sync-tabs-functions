/**
 * Created by pawel on 07.09.15.
 *
 * Common idea:
 * Create object that will be implement logic of it method only at one page at current user.
 * For example: I open 3 tabs with site page. At every page javascript run method `getNewMessageFromServer` but instead of creating 3 request to server(one per page) code will be generated single request to page and than synchronize data between tabs local.
 *
 * Implementation:
 * `localStorage` are always synchronize between tabs. We save at local storage data that need every tabs understand if it need to generate request or it need to load local data.  For that we need create unique identity for every tabs. Save at localStorage data about first open tab and every next tab should read data from localStorage instead of server. If tab is closed next open tab start generates request for server and other tab load data from server and etc.
 */
// todo add check is localstorage available if not run current action
var SyncObject = {

    /**
     * Unique identity of current page
     */
    uid: false,

    /**
     * Time between two tick
     */
    delayBetweenTick: 1000,

    /**
     * List of jobs that already started
     */
    activeJobs: [],

    /**
     * Allow set to any tab advantage from anothers
     */
    priority: 1,

    /**
     * Return current time. Compatibility with IE8
     * @returns {*}
     */
    now: function () {
        var now = Date.now || /* istanbul ignore next */ function () {
                return +(new Date);
            };
        return now();
    },

    /**
     * Get unique identity of current action and tab
     * @param jobName Name of job, for multiple function at synchronization
     */
    getUniqIdentity: function (jobName) {
        return jobName + '_' + this.uid;
    },

    /**
     * Get data of active tab from storage
     * @param job Name of job, for multiple function at synchronization
     */
    isTabActive: function (job) {
        var activeTab = JSON.parse(localStorage.getItem("syncObject_" + job.name));
        return (activeTab.activeTab == this.getUniqIdentity(job.name));
    },

    /**
     *
     * @param activeTab
     * @param job
     * @returns {boolean}
     */
    isCurrentPriorityMore: function (activeTab, job) {
        return activeTab.priority < job.priority;
    },

    /**
     * Act function. If current tab not active return false and set isActiveTab to false
     * @param obj With 3 params of current work
     * obj.jobName (mandatory) - Name of current job
     * obj.activeFunction (mandatory) - Function that should be call if it`s active tab hob
     * obj.passiveFunction - Function that should be call if it isn`t active job
     * obj.priority - Priority of current tab between another tabs
     */
    act: function (obj) {
        var job = {
            name: obj.jobName,
            priority: obj.priority || 1
        };

        this.init(job);
        this.checkTab(job);

        if (this.isTabActive(job)) {
            if (typeof obj.activeFunction === 'function') {
                obj.activeFunction();
            }
        } else {
            if (typeof obj.passiveFunction === 'function') {
                obj.passiveFunction();
            }
        }

        this.timeLastTick = this.timeCurrentTick;
    },

    /**
     * Set current tab as active tabs
     * @param job Name of job, for multiple function at synchronization
     */
    setCurrentTabActive: function (job) {
        if (typeof job == 'string') {
            var jobName = job;
            job = {
                name: jobName,
                priority: 1
            }
        }
        localStorage.setItem("syncObject_" + job.name, JSON.stringify({
            lastTick: this.now(),
            activeTab: this.getUniqIdentity(job.name),
            priority: job.priority,
        }));
    },

    /**
     *
     * @param job
     */
    tick: function (job) {
        if (typeof job == 'string') {
            var jobName = job;
            job = {
                name: jobName,
                priority: 1
            }
        }
        this.checkTab(job);
        var self = this;
        setTimeout(
            function () {
                self.tick(job)
            },
            this.delayBetweenTick
        );
    },

    checkTab: function (job) {
        var activeTab = JSON.parse(localStorage.getItem("syncObject_" + job.name));
        if (!activeTab
            || this.timeout(activeTab)
            || this.isTabActive(job)
            || this.isCurrentPriorityMore(activeTab, job)
        ) {
            console.log(job, 'current');
            this.setCurrentTabActive(job);
        } else {
            console.log(job, 'passive current');
        }
        var se
    },

    timeout: function (activeTab) {
        return (activeTab.lastTick < (this.now() - 2 * this.delayBetweenTick));
    },


    /**
     * Initialization of object for special work
     * @param job
     */
    init: function (job) {
        if (typeof job == 'string') {
            var jobName = job;
            job = {
                name: jobName,
                priority: 1
            }
        }
        if (!this.uid) {
            this.uid = Math.random();
        }
        if (this.activeJobs.indexOf(job.name) === -1) {
            this.activeJobs.push(job.name);
            this.tick(job);
        }
    }
};