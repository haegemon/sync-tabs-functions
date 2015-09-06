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



var SynchObject = {

    /**
     * Is current tab active now
     */
    isActiveTab: false,

    /**
     * Get unique identity of current tab
     */
    getUniqIdentity: function () {
        ;
    },

    /**
     * Get data of active tab from storage
     */
    getActiveTabData: function () {
    },

    /**
     * Check is active tab is alive
     */
    checkIsActiveTabAlive: function () {

    },

    /**
     * Act function. If current tab not active return false and set isActiveTab to false
     * @param funct Function that should be run
     * @param jobName Name of job, for multiple function at synchronization
     */
    act: function (funct, jobName) {

    },

    /**
     * Set current tab as active tabs
     */
    setCurrentTabActive: function () {
    }

};
