document.getElementById('copyEmail').addEventListener('click', function() {
    const content = "phigrostl@163.com";
    navigator.clipboard.writeText(content).then(function() {
        alert('Email copied to clipboard');
    })
});
