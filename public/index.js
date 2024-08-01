document.getElementById('qrForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const url = document.getElementById('URL').value;

    const response = await fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ URL: url })
    });

    const data = await response.json();

    if (data.success) {
        const qrImage = document.getElementById('qrImage');
        const downloadLink = document.getElementById('downloadLink');

        document.querySelector("img").setAttribute("src",data.imagePath);
        qrImage.style.display = 'block';

        document.querySelector(".msg").innerText = "Your QR Code is created";
        
        qrImage.onload = function() {
            downloadLink.href = data.imagePath;
            downloadLink.style.display = 'inline-block';
        }

    } else {
        alert('Error generating QR code');
    }
});
