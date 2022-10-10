import * as moment from "moment";

const uriApi = "https://portfoliobackendjczo.herokuapp.com"; //"http://localhost:8080";

const formatDate = (fecha : Date | undefined) => {
    if (fecha) {
        let parsedDate = moment(fecha, "YYYY-MM-DD");
        let outputDate = parsedDate.format("MMM YYYY");
        return " " + outputDate.toUpperCase() + " ";
    }
    return " Actualidad ";
}

export {uriApi, formatDate}