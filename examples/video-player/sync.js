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
var SynchObject = {

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
     * Get unique identity of current action and tab
     * @param jobName Name of job, for multiple function at synchronization
     */
    getUniqIdentity: function (jobName) {
        return jobName + '_' + this.uid;
    },

    /**
     * Get data of active tab from storage
     * @param jobName Name of job, for multiple function at synchronization
     */
    isTabActive: function (jobName) {
        var activeTab = JSON.parse(localStorage.getItem("syncObject_" + jobName));
        return (activeTab.activeTab == this.getUniqIdentity(jobName));
    },

    /**
     * Act function. If current tab not active return false and set isActiveTab to false
     * @param obj With 3 params of current work
     * obj.jobName (mandatory) - Name of current job
     * obj.activeFunction (mandatory) - Function that should be call if it`s active tab hob
     * obj.passiveFunction - Function that should be call if it isn`t active job
     */
    act: function (obj) {
        this.init(obj.jobName);
        if (this.isTabActive(obj.jobName)) {
            obj.activeFunction();
        } else {
            obj.passiveFunction();
        }

        this.timeLastTick = this.timeCurrentTick;
    },

    /**
     * Set current tab as active tabs
     * @param jobName Name of job, for multiple function at synchronization
     */
    setCurrentTabActive: function (jobName) {
        localStorage.setItem("syncObject_" + jobName, JSON.stringify({
            lastTick: Date.now(),
            activeTab: this.getUniqIdentity(jobName)
        }));
    },

    /**
     *
     * @param jobName
     */
    tik: function (jobName) {
        var activeTab = JSON.parse(localStorage.getItem("syncObject_" + jobName));
        if (!activeTab
            || (activeTab.lastTick < (Date.now() - 2 * this.delayBetweenTick))
            || this.isTabActive(jobName)) {
            this.setCurrentTabActive(jobName);
        }
        var self = this;
        setTimeout(
            function () {
                self.tik(jobName)
            },
            this.delayBetweenTick
        );
    },

    /**
     * Initialization of object for special work
     */
    init: function (jobName) {
        if (!this.uid) {
            this.uid = Math.random();
        }
        if (this.activeJobs.indexOf(jobName) === -1) {
            this.activeJobs.push(jobName);
            this.tik(jobName);
        }
    }
};