(function() {
    // 1. Setup UI Cyberpunk/Neon
    const style = document.createElement('style');
    style.innerHTML = `
        #jiceo-adblock-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 2147483647; color: #0ff; font-family: 'Courier New', monospace;
            display: none; flex-direction: column; align-items: center; justify-content: center;
            border: 8px solid #ff00ff; box-shadow: inset 0 0 50px #ff00ff;
        }
        .glitch { font-size: 3rem; font-weight: bold; color: #0ff; text-transform: uppercase; animation: blink 1s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .btn-restart {
            margin-top: 30px; padding: 20px 40px; background: #000; border: 2px solid #0ff;
            color: #0ff; cursor: pointer; font-size: 1.5rem; transition: 0.3s;
        }
        .btn-restart:hover { background: #0ff; color: #000; box-shadow: 0 0 20px #0ff; }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.id = 'jiceo-adblock-overlay';
    overlay.innerHTML = `
        <div class="glitch">SYSTEM ERROR: AD-BLOCKER DETECTED</div>
        <h2 style="color: #fff">Vui lòng tắt tiện ích chặn quảng cáo!</h2>
        <p>Hệ thống không thể hoạt động với Ad-blocker.</p>
        <button class="btn-restart" onclick="window.location.reload()">I DID IT! RESTART AND CHECK</button>
    `;
    document.body.appendChild(overlay);

    // 2. Multi-Stage Detection
    function runDetection() {
        let detected = false;

        // Lớp 1: Kiểm tra Bait Element (Phần tử quảng cáo giả)
        const bait = document.createElement('div');
        bait.innerHTML = '&nbsp;';
        bait.className = 'adsbox'; // Các extension thường chặn class này
        bait.style.position = 'absolute';
        bait.style.top = '-9999px';
        document.body.appendChild(bait);

        // Lớp 2: Kiểm tra Google Ads (Độ chính xác cao)
        const adsScript = document.createElement('script');
        adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        adsScript.onerror = () => { detected = true; };
        document.body.appendChild(adsScript);

        // Lớp 3: Kiểm tra sự tồn tại của bait sau 1s
        setTimeout(() => {
            if (bait.offsetParent === null || bait.offsetHeight === 0 || detected) {
                overlay.style.display = 'flex';
            }
            bait.remove();
        }, 1000);
    }

    // Chạy khi trang tải xong
    window.addEventListener('load', runDetection);
})();
