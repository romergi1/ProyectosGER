exports.requestUser = function (event) {
    return {
        "viOperation": event.viOperation,
        "viIdRo": event.viIdRo,
        "viTypeElec": event.viTypeElec,
        "viIdenUs": event.viIdenUs,
        "viValueTypeElec": event.viValueTypeElec,
        "viValueQuantity": event.viValueQuantity,
    };
}