async function sla() {
    fetch('/api/user')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}