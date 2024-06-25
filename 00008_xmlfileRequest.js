export function loadXMLDoc(filename) {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseXML);
            } else if (this.readyState == 4) {
                reject(new Error('Failed to load XML file'));
            }
        };
        xhttp.open("GET", filename, true);
        xhttp.send();
    });
}
//입력한 데이터 다시 집어 넣기
export function updateXMLDoc(filename, tagName, value) {
    return new Promise((resolve, reject) => {
        loadXMLDoc(filename).then(xmlDoc => {
            const tempElement = xmlDoc.getElementsByTagName(tagName)[0];
            if (tempElement) {
                tempElement.textContent = value;
                const xhttp = new XMLHttpRequest();
                xhttp.open("POST", filename, true);
                xhttp.setRequestHeader("Content-Type", "application/xml");
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        resolve();
                    } else if (this.readyState == 4) {
                        reject(new Error('Failed to update XML file'));
                    }
                };
                xhttp.send(new XMLSerializer().serializeToString(xmlDoc));
            } else {
                reject(new Error(`Tag <${tagName}> not found in XML`));
            }
        }).catch(error => reject(error));
    });
}