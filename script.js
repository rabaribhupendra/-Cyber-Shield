
    function analyzeLink() {
        const urlInput = document.getElementById('urlInputField').value.trim();
        const outputDiv = document.getElementById('detectionOutput');

        // Check if input is empty
        if (urlInput === "") {
            alert("Please enter a link to scan!");
            return;
        }

        // List of suspicious keywords commonly used in phishing attacks
        const maliciousKeywords = [
            'free', 'lottery', 'gift', 'win', 'lucky', 'crypto-bonus', 
            'login-banking', 'update-password', 'verify-account', 
            'amazon-offers', 'free-recharge', 'paytm-cashback'
        ];
        
        let isFlagged = false;
        let warningReason = "";

        // 1. Protocol Check (Unsecure HTTP connection)
        if (urlInput.toLowerCase().startsWith('http://')) {
            isFlagged = true;
            warningReason = "This website does not use a secure connection (uses unencrypted HTTP protocol).";
        }

        // 2. Keyword Checking
        maliciousKeywords.forEach(function(keyword) {
            if (urlInput.toLowerCase().includes(keyword)) {
                isFlagged = true;
                warningReason = `A suspicious keyword [${keyword}] associated with cyber fraud was found in the link.`;
            }
        });

        // Display output box and set layout styles
        outputDiv.style.display = "block";

        if (isFlagged) {
            outputDiv.className = "result-box danger";
            outputDiv.innerHTML = `
                <strong>⚠️ WARNING (Danger)! This link appears to be a Phishing attempt.</strong><br>
                <p style="margin-top: 5px; font-weight: normal; font-size: 14px;">
                    <strong>Reason:</strong> ${warningReason}<br>
                    Under no circumstances should you provide your User ID, Password, or Banking details on this link.
                </p>
            `;
        } else {
            outputDiv.className = "result-box safe";
            outputDiv.innerHTML = `
                <strong>✅ Link appears to be Secure (Safe)!</strong><br>
                <p style="margin-top: 5px; font-weight: normal; font-size: 14px;">
                    Our preliminary scan did not detect any major cyber threats. (However, always remain vigilant with unknown sources).
                </p>
            `;
        }
    }