var valid = {
    verifyMultiIds: function (idList) {
        var ids = idList.replace(/[\r\n\s]/gm, ',');
        var newIds = ids.replace(/(\d+,+)/g, '');
        if (!/^(\d+[,]?)+$/g.test(newIds)) {
            return false;
        }
        return ids.replace(/,+/g, ',');
    }
};

window.GLOBAL.util.validation = validation;
