document.getElementById('copyEmail').addEventListener('click', function() {
    const content = "phigrostl@163.com";
    navigator.clipboard.writeText(content).then(function() {
        alert('邮箱已复制');
    })
});
