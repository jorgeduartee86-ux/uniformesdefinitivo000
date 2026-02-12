
// ==========================================
// M23 SPORT - MAIN SCRIPT
// ==========================================

// --- 5. CHAT INTEGRATION FROM DETAIL PAGE ---
window.openChatFromDetail = function () {
    if (!currentProduct) return;

    // Identify model (if window.products didn't fully sync, reconstruct or use title)
    // currentProduct is set in initProductDetailPage
    let modelId = currentProduct.modelId;

    // Fallback if modelId missing (legacy objects)
    if (!modelId) {
        // Try to parse from title or just use title
        modelId = currentProduct.title;
    }

    if (window.openChatWithProduct) {
        window.openChatWithProduct(modelId);
    } else {
        console.error("Chat function not found. Ensure chatbot.js is loaded.");
    }
};


// --- 6. COLOMBIA MODAL LOGIC ---
function initColombiaModal() {
    const modal = document.getElementById("colombiaModal");
    const btns = [document.getElementById("btnColombia"), document.getElementById("btnColombiaHero")];
    const span = document.getElementsByClassName("close-modal")[0];

    btns.forEach(btn => {
        if (btn && modal) {
            btn.onclick = function (e) {
                e.preventDefault(); // Prevent hash jump
                modal.style.display = "flex";
            }
        }
    });

    if (span && modal) {
        span.onclick = function () {
            modal.style.display = "none";
        }
    }

    if (modal) {
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
}

// --- 7. NINOS MODAL LOGIC ---
function initNinosModal() {
    const modal = document.getElementById("ninosModal");
    const btns = [document.getElementById("btnNinosHero")];
    const span = document.getElementsByClassName("close-modal-ninos")[0];

    btns.forEach(btn => {
        if (btn && modal) {
            btn.onclick = function (e) {
                e.preventDefault(); // Prevent hash jump
                modal.style.display = "flex";
            }
        }
    });

    if (span && modal) {
        span.onclick = function () {
            modal.style.display = "none";
        }
    }

    // Window click closing logic needs to handle both modals or check specificity
    // Since window.onclick is overwritten in initColombiaModal, we need a unified approach or careful ordering.
    // The previous initColombiaModal sets window.onclick. If we set it again here, we overwrite it.
    // Better to append or use addEventListener. But existing code uses onclick.
    // Let's modify window.onclick to handle both if they exist.

    window.addEventListener('click', function (event) {
        const colombiaModal = document.getElementById("colombiaModal");
        const ninosModal = document.getElementById("ninosModal");

        if (event.target == colombiaModal) {
            colombiaModal.style.display = "none";
        }
        if (event.target == ninosModal) {
            ninosModal.style.display = "none";
        }
    });
}




// --- 1. CONFIGURATION & DATA ---

// Catalog Data
const productImages = [
    "https://i.ibb.co/YBFJBBKY/IMG-20260204-WA0007.jpg",
    "https://i.ibb.co/Csb0P1t0/IMG-20260204-WA0008.jpg",
    "https://i.ibb.co/zW1gG2Zt/IMG-20260204-WA0009.jpg",
    "https://i.ibb.co/wZBMNWYM/IMG-20260204-WA0010.jpg",
    "https://i.ibb.co/xSkmWmth/IMG-20260204-WA0011.jpg",
    "https://i.ibb.co/JFcWW1Rf/IMG-20260204-WA0012.jpg",
    "https://i.ibb.co/HpGfB4Pr/IMG-20260204-WA0013.jpg",
    "https://i.ibb.co/vxdS1vPB/IMG-20260204-WA0014.jpg",
    "https://i.ibb.co/Nd3GN5TB/IMG-20260204-WA0015.jpg",
    "https://i.ibb.co/S4HNr92G/IMG-20260204-WA0016.jpg",
    "https://i.ibb.co/dwrFSF9k/IMG-20260204-WA0017.jpg",
    "https://i.ibb.co/20b6K1wp/IMG-20260204-WA0018.jpg",
    "https://i.ibb.co/Jjxt0Sg2/IMG-20260204-WA0019.jpg",
    "https://i.ibb.co/kNB0xXh/IMG-20260204-WA0020.jpg",
    "https://i.ibb.co/8gvZJvy4/IMG-20260204-WA0021.jpg",
    "https://i.ibb.co/j9R6CWVN/IMG-20260204-WA0022.jpg",
    "https://i.ibb.co/CKd4Sn6s/IMG-20260204-WA0023.jpg",
    "https://i.ibb.co/1YYMtrX7/IMG-20260204-WA0024.jpg",
    "https://i.ibb.co/ZzJzmQgr/IMG-20260204-WA0025.jpg",
    "https://i.ibb.co/1t2RCMbk/IMG-20260204-WA0026.jpg",
    "https://i.ibb.co/Q7p6Kxtw/IMG-20260204-WA0027.jpg",
    "https://i.ibb.co/gb8cMsYN/IMG-20260204-WA0028.jpg",
    "https://i.ibb.co/qFDgrxdm/IMG-20260204-WA0029.jpg",
    "https://i.ibb.co/1f5WgyyY/IMG-20260204-WA0030.jpg",
    "https://i.ibb.co/XkZ9fm8Q/IMG-20260204-WA0031.jpg",
    "https://i.ibb.co/Rkqvcs3V/IMG-20260204-WA0032.jpg",
    "https://i.ibb.co/RpPTVX4L/IMG-20260204-WA0033.jpg",
    "https://i.ibb.co/yFqKcmdD/IMG-20260204-WA0034.jpg",
    "https://i.ibb.co/Zpvm4y2M/IMG-20260204-WA0035.jpg",
    "https://i.ibb.co/SDjPdrtW/IMG-20260204-WA0036.jpg",
    "https://i.ibb.co/vCzXpBMy/IMG-20260204-WA0037.jpg",
    "https://i.ibb.co/hJ9xJ0ZB/IMG-20260204-WA0038.jpg",
    "https://i.ibb.co/Ng144qpP/IMG-20260204-WA0039.jpg",
    "https://i.ibb.co/N2CQVGbs/IMG-20260204-WA0040.jpg",
    "https://i.ibb.co/Tx8hKJm1/IMG-20260204-WA0041.jpg",
    "https://i.ibb.co/fGvxY70y/IMG-20260204-WA0042.jpg",
    "https://i.ibb.co/ymQ4ZrFD/IMG-20260204-WA0043.jpg",
    "https://i.ibb.co/HD2Z6STD/IMG-20260204-WA0044.jpg",
    "https://i.ibb.co/SDw9pVDt/IMG-20260204-WA0045.jpg",
    "https://i.ibb.co/YF1jXfNK/IMG-20260204-WA0046.jpg",
    "https://i.ibb.co/xt4jMH1V/IMG-20260204-WA0047.jpg",
    "https://i.ibb.co/xp7ZHDC/IMG-20260204-WA0048.jpg",
    "https://i.ibb.co/5gVPnmsg/IMG-20260204-WA0049.jpg",
    "https://i.ibb.co/wZRpF0yv/IMG-20260204-WA0050.jpg",
    "https://i.ibb.co/sJJZRLnj/IMG-20260204-WA0051.jpg",
    "https://i.ibb.co/Ngq6hYZC/IMG-20260204-WA0052.jpg",
    "https://i.ibb.co/jkr4wKCC/IMG-20260204-WA0053.jpg",
    "https://i.ibb.co/hJFmN4vs/IMG-20260204-WA0054.jpg",
    "https://i.ibb.co/wFzcnJ6H/IMG-20260204-WA0055.jpg",
    "https://i.ibb.co/vvMLWDHQ/IMG-20260204-WA0056.jpg",
    "https://i.ibb.co/6RfBFvkk/IMG-20260204-WA0057.jpg",
    "https://i.ibb.co/7t3cDtNt/IMG-20260204-WA0058.jpg",
    "https://i.ibb.co/4RMykr2d/IMG-20260204-WA0059.jpg",
    "https://i.ibb.co/BK22C2xv/IMG-20260204-WA0060.jpg",
    "https://i.ibb.co/1tbnHtMQ/IMG-20260204-WA0061.jpg",
    "https://i.ibb.co/67F0r5kM/IMG-20260204-WA0062.jpg",
    "https://i.ibb.co/q3tXzhkJ/IMG-20260204-WA0063.jpg",
    "https://i.ibb.co/kshMbpvB/IMG-20260204-WA0064.jpg",
    "https://i.ibb.co/n8QXthpB/IMG-20260204-WA0065.jpg",
    "https://i.ibb.co/WWXvK5zb/IMG-20260204-WA0066.jpg",
    "https://i.ibb.co/r2pFG4ZD/IMG-20260204-WA0067.jpg",
    "https://i.ibb.co/qMFv8CHB/IMG-20260204-WA0068.jpg",
    "https://i.ibb.co/prykLDHp/IMG-20260204-WA0069.jpg",
    "https://i.ibb.co/4RSBDBkj/IMG-20260204-WA0070.jpg",
    "https://i.ibb.co/jPQ7fmcw/IMG-20260204-WA0071.jpg",
    "https://i.ibb.co/SXMGFFdV/IMG-20260204-WA0072.jpg",
    "https://i.ibb.co/MD4DDS5N/IMG-20260204-WA0073.jpg",
    "https://i.ibb.co/Fb3ZFpnv/IMG-20260204-WA0074.jpg",
    "https://i.ibb.co/C5Fw5mb0/IMG-20260204-WA0075.jpg",
    "https://i.ibb.co/MymxB6SB/IMG-20260204-WA0076.jpg",
    "https://i.ibb.co/0R7H3Wvf/IMG-20260204-WA0077.jpg",
    "https://i.ibb.co/Y71SRKL7/IMG-20260204-WA0078.jpg",
    "https://i.ibb.co/6LbQf7D/IMG-20260204-WA0079.jpg",
    "https://i.ibb.co/35bNNC5Y/IMG-20260204-WA0080.jpg",
    "https://i.ibb.co/cSLKYw0T/IMG-20260204-WA0081.jpg",
    "https://i.ibb.co/XZ39L4sN/IMG-20260204-WA0082.jpg",
    "https://i.ibb.co/zTqL98Wk/IMG-20260204-WA0083.jpg",
    "https://i.ibb.co/C3G8zFvj/IMG-20260204-WA0084.jpg",
    "https://i.ibb.co/FqdPhQwy/IMG-20260204-WA0085.jpg",
    "https://i.ibb.co/bMsMPY7y/IMG-20260204-WA0086.jpg",
    "https://i.ibb.co/KpQrKdHS/IMG-20260204-WA0087.jpg",
    "https://i.ibb.co/b8JK7Q2/IMG-20260204-WA0088.jpg",
    "https://i.ibb.co/WpB8Phzk/IMG-20260204-WA0089.jpg",
    "https://i.ibb.co/svp1y4vX/IMG-20260204-WA0090.jpg",
    "https://i.ibb.co/Kj2c38Qc/IMG-20260204-WA0091.jpg",
    "https://i.ibb.co/3mrd5bQg/IMG-20260204-WA0092.jpg",
    "https://i.ibb.co/GfbVt7yg/IMG-20260204-WA0093.jpg",
    "https://i.ibb.co/4RRgTnH6/IMG-20260204-WA0094.jpg",
    "https://i.ibb.co/PGmdqRgw/IMG-20260204-WA0095.jpg",
    "https://i.ibb.co/6RFzLtC8/IMG-20260204-WA0096.jpg",
    "https://i.ibb.co/sJJYJQWC/IMG-20260204-WA0097.jpg",
    "https://i.ibb.co/0V2QwdxC/IMG-20260204-WA0098.jpg",
    "https://i.ibb.co/9m7mBQwd/IMG-20260204-WA0099.jpg",
    "https://i.ibb.co/3Y4qcBSX/IMG-20260204-WA0100.jpg",
    "https://i.ibb.co/YF964w6F/IMG-20260204-WA0101.jpg",
    "https://i.ibb.co/Jj9RN9SR/IMG-20260204-WA0102.jpg",
    "https://i.ibb.co/5gsZ6r3x/IMG-20260204-WA0103.jpg",
    "https://i.ibb.co/GfWBQjkS/IMG-20260204-WA0104.jpg",
    "https://i.ibb.co/NgNdtG2M/IMG-20260204-WA0105.jpg",
    "https://i.ibb.co/6c4dSkYR/IMG-20260204-WA0106.jpg",
    "https://i.ibb.co/W4C4zt0g/IMG-20260204-WA0108.jpg",
    "https://i.ibb.co/Vd3jJtx/IMG-20260204-WA0109.jpg",
    "https://i.ibb.co/HTZ93pxx/IMG-20260204-WA0110.jpg",
    "https://i.ibb.co/wrxg6pZk/IMG-20260204-WA0111.jpg",
    "https://i.ibb.co/BVy225cT/IMG-20260204-WA0112.jpg",
    "https://i.ibb.co/wN7tmxfb/IMG-20260204-WA0113.jpg",
    "https://i.ibb.co/7JbrxSC8/IMG-20260204-WA0114.jpg",
    "https://i.ibb.co/v4FjjwPW/IMG-20260204-WA0115.jpg",
    "https://i.ibb.co/C54xW9GP/IMG-20260204-WA0116.jpg",
    "https://i.ibb.co/ch8pWrSz/IMG-20260204-WA0117.jpg",
    "https://i.ibb.co/Txvk3tFn/IMG-20260204-WA0118.jpg",
    "https://i.ibb.co/23ZvWNnB/IMG-20260204-WA0119.jpg",
    "https://i.ibb.co/jZHpMf5n/IMG-20260204-WA0120.jpg",
    "https://i.ibb.co/CKP0044z/IMG-20260204-WA0121.jpg",
    "https://i.ibb.co/bM8sjgRH/IMG-20260204-WA0122.jpg",
    "https://i.ibb.co/7Nvkpq0Z/IMG-20260204-WA0123.jpg",
    "https://i.ibb.co/nqHQrb8g/IMG-20260204-WA0124.jpg",
    "https://i.ibb.co/v6XHn7T2/IMG-20260204-WA0125.jpg",
    "https://i.ibb.co/9MbwBV5/IMG-20260204-WA0126.jpg",
    "https://i.ibb.co/zV5kbspf/IMG-20260204-WA0127.jpg",
    "https://i.ibb.co/dwSS8pYK/IMG-20260204-WA0128.jpg",
    "https://i.ibb.co/mV0ZGSbR/IMG-20260204-WA0129.jpg",
    "https://i.ibb.co/3y3bJFFH/IMG-20260204-WA0130.jpg",
    "https://i.ibb.co/21D5Tmqx/IMG-20260204-WA0131.jpg",
    "https://i.ibb.co/Lh0MvhJg/IMG-20260204-WA0132.jpg",
    "https://i.ibb.co/j9j4nYrY/IMG-20260204-WA0133.jpg",
    "https://i.ibb.co/TBnqPFsR/IMG-20260204-WA0134.jpg",
    "https://i.ibb.co/0VJ8smCC/IMG-20260204-WA0135.jpg",
    "https://i.ibb.co/cXYthMn0/IMG-20260204-WA0136.jpg",
    "https://i.ibb.co/QjKML5VB/IMG-20260204-WA0137.jpg",
    "https://i.ibb.co/zTDWgtVM/IMG-20260204-WA0138.jpg",
    "https://i.ibb.co/Cp1RCD1D/IMG-20260204-WA0139.jpg",
    "https://i.ibb.co/3yVQtZJC/IMG-20260204-WA0140.jpg",
    "https://i.ibb.co/rGhbkdnS/IMG-20260204-WA0141.jpg",
    "https://i.ibb.co/ZpjpgZvJ/IMG-20260204-WA0142.jpg",
    "https://i.ibb.co/21hDmw3s/IMG-20260204-WA0143.jpg",
    "https://i.ibb.co/PvSjjjh9/IMG-20260204-WA0144.jpg",
    "https://i.ibb.co/S46rQ6zQ/IMG-20260204-WA0145.jpg",
    "https://i.ibb.co/FLrDgc0Z/IMG-20260204-WA0146.jpg",
    "https://i.ibb.co/twkf5LpY/IMG-20260204-WA0147.jpg",
    "https://i.ibb.co/V04Gx8Dd/IMG-20260204-WA0148.jpg",
    "https://i.ibb.co/J84rxgy/IMG-20260204-WA0149.jpg",
    "https://i.ibb.co/B5pYZJ8N/IMG-20260204-WA0150.jpg",
    "https://i.ibb.co/7d6YC4HT/IMG-20260204-WA0152.jpg",
    "https://i.ibb.co/Jj2B67xR/IMG-20260204-WA0153.jpg",
    "https://i.ibb.co/2Yn1cdkx/IMG-20260204-WA0154.jpg",
    "https://i.ibb.co/sdVpKw7m/IMG-20260204-WA0155.jpg",
    "https://i.ibb.co/bM4btGvg/IMG-20260204-WA0156.jpg",
    "https://i.ibb.co/8L0LjfKk/IMG-20260204-WA0157.jpg",
    "https://i.ibb.co/LhgtBN4q/IMG-20260204-WA0158.jpg",
    "https://i.ibb.co/N2q9ZbzC/IMG-20260204-WA0159.jpg",
    "https://i.ibb.co/bMsR0cHV/IMG-20260204-WA0160.jpg",
    "https://i.ibb.co/RGCmmPCF/IMG-20260204-WA0161.jpg",
    "https://i.ibb.co/Qj3Jn1mj/IMG-20260204-WA0162.jpg",
    "https://i.ibb.co/Zp0JPc6k/IMG-20260204-WA0163.jpg",
    "https://i.ibb.co/jv9gpJDx/IMG-20260204-WA0164.jpg",
    "https://i.ibb.co/rKzPkVk4/IMG-20260204-WA0165.jpg",
    "https://i.ibb.co/XfQGnPZN/IMG-20260204-WA0166.jpg",
    "https://i.ibb.co/KcxmM2G3/IMG-20260204-WA0167.jpg",
    "https://i.ibb.co/bjKjxBHr/IMG-20260204-WA0168.jpg",
    "https://i.ibb.co/tMP1Z42h/IMG-20260204-WA0169.jpg",
    "https://i.ibb.co/R4M7GXKB/IMG-20260204-WA0170.jpg",
    "https://i.ibb.co/PvPJd2wb/IMG-20260204-WA0171.jpg",
    "https://i.ibb.co/mrfXWHt2/IMG-20260204-WA0172.jpg",
    "https://i.ibb.co/TM3Bxm51/IMG-20260204-WA0173.jpg",
    "https://i.ibb.co/qM780HsW/IMG-20260204-WA0174.jpg",
    "https://i.ibb.co/rR13PDZK/IMG-20260204-WA0175.jpg",
    "https://i.ibb.co/Z781S9D/IMG-20260204-WA0176.jpg",
    "https://i.ibb.co/Kxt7kTw9/IMG-20260204-WA0177.jpg",
    "https://i.ibb.co/4n2jCZGB/IMG-20260204-WA0178.jpg",
    "https://i.ibb.co/84zWvF3Q/IMG-20260204-WA0179.jpg",
    "https://i.ibb.co/d0wzFqML/IMG-20260204-WA0180.jpg",
    "https://i.ibb.co/h18stVRK/IMG-20260204-WA0181.jpg",
    "https://i.ibb.co/HLZvwnQk/IMG-20260204-WA0182.jpg",
    "https://i.ibb.co/bRvT0rQv/IMG-20260204-WA0183.jpg",
    "https://i.ibb.co/WWr0K9ch/IMG-20260204-WA0184.jpg",
    "https://i.ibb.co/ycMS0p8N/IMG-20260204-WA0185.jpg",
    "https://i.ibb.co/fV1P5rmM/IMG-20260204-WA0186.jpg",
    "https://i.ibb.co/JWwc7wkJ/IMG-20260204-WA0187.jpg",
    "https://i.ibb.co/nNgYSFr6/IMG-20260204-WA0188.jpg",
    "https://i.ibb.co/Vdfj3cH/IMG-20260204-WA0189.jpg",
    "https://i.ibb.co/Z1KG5365/IMG-20260204-WA0190.jpg",
    "https://i.ibb.co/Ng3rw9xK/IMG-20260204-WA0191.jpg",
    "https://i.ibb.co/gZWN7tMz/IMG-20260204-WA0192.jpg",
    "https://i.ibb.co/SDbWhYfJ/IMG-20260204-WA0193.jpg",
    "https://i.ibb.co/ynTctPGf/IMG-20260204-WA0194.jpg",
    "https://i.ibb.co/Q3DTZXmQ/IMG-20260204-WA0195.jpg",
    "https://i.ibb.co/j9SH1wXw/IMG-20260204-WA0196.jpg",
    "https://i.ibb.co/21x64vr7/IMG-20260204-WA0197.jpg",
    "https://i.ibb.co/2YHckHBt/IMG-20260204-WA0198.jpg",
    "https://i.ibb.co/TxpkBpTf/IMG-20260204-WA0199.jpg",
    "https://i.ibb.co/Pv6YksZ9/IMG-20260204-WA0200.jpg",
    "https://i.ibb.co/HDsJ1T7k/IMG-20260204-WA0201.jpg",
    "https://i.ibb.co/x82G4j96/IMG-20260204-WA0202.jpg",
    "https://i.ibb.co/BH3sxHF7/IMG-20260204-WA0203.jpg",
    "https://i.ibb.co/Z1WNWXrL/IMG-20260204-WA0204.jpg",
    "https://i.ibb.co/kVBNPTS7/IMG-20260204-WA0205.jpg",
    "https://i.ibb.co/TxsL9vbH/IMG-20260204-WA0206.jpg",
    "https://i.ibb.co/67rtm7dH/IMG-20260204-WA0207.jpg",
    "https://i.ibb.co/chftbpyP/IMG-20260204-WA0208.jpg",
    "https://i.ibb.co/238jXtVK/IMG-20260204-WA0209.jpg",
    "https://i.ibb.co/WN9J5p7C/IMG-20260204-WA0210.jpg",
    "https://i.ibb.co/6cDdNSR3/IMG-20260204-WA0211.jpg",
    "https://i.ibb.co/v68QdwDh/IMG-20260204-WA0212.jpg",
    "https://i.ibb.co/jc6qpNS/IMG-20260204-WA0213.jpg",
    "https://i.ibb.co/pv53fs1q/IMG-20260204-WA0214.jpg",
    "https://i.ibb.co/nss1JcdH/IMG-20260204-WA0215.jpg",
    "https://i.ibb.co/SSNbThW/IMG-20260204-WA0216.jpg",
    "https://i.ibb.co/PZgBkrM9/IMG-20260204-WA0217.jpg",
    "https://i.ibb.co/0pp2YCL6/IMG-20260204-WA0218.jpg",
    "https://i.ibb.co/205kY69W/IMG-20260204-WA0219.jpg",
    "https://i.ibb.co/MDxk5v1W/IMG-20260204-WA0220.jpg",
    "https://i.ibb.co/PGqqDQRs/IMG-20260204-WA0221.jpg",
    "https://i.ibb.co/B5n71GbF/IMG-20260204-WA0222.jpg",
    "https://i.ibb.co/fVJrdDPj/IMG-20260204-WA0223.jpg",
    "https://i.ibb.co/sJXxwwxb/IMG-20260204-WA0224.jpg",
    "https://i.ibb.co/d4XF5Ldt/IMG-20260204-WA0225.jpg",
    "https://i.ibb.co/7x0ph6j1/IMG-20260204-WA0226.jpg",
    "https://i.ibb.co/Q37PrcgY/IMG-20260204-WA0227.jpg",
    "https://i.ibb.co/vvw5hxKN/IMG-20260204-WA0228.jpg",
    "https://i.ibb.co/fY47dBT5/IMG-20260204-WA0229.jpg",
    "https://i.ibb.co/2YmSJq8r/IMG-20260204-WA0230.jpg",
    "https://i.ibb.co/jkvMYd15/IMG-20260204-WA0231.jpg",
    "https://i.ibb.co/Vy449G6/IMG-20260204-WA0232.jpg",
    "https://i.ibb.co/4RZvv0pv/IMG-20260204-WA0233.jpg",
    "https://i.ibb.co/Cp39QfGF/IMG-20260204-WA0234.jpg",
    "https://i.ibb.co/hRGNR2mZ/IMG-20260204-WA0235.jpg",
    "https://i.ibb.co/tTQRCBfQ/IMG-20260204-WA0236.jpg",
    "https://i.ibb.co/HDMjcmvy/IMG-20260204-WA0237.jpg",
    "https://i.ibb.co/7Jw66ddg/IMG-20260204-WA0238.jpg",
    "https://i.ibb.co/zC5ZtHV/IMG-20260204-WA0239.jpg",
    "https://i.ibb.co/1G3fY7Vc/IMG-20260204-WA0240.jpg",
    "https://i.ibb.co/4ZL3QDFL/IMG-20260204-WA0241.jpg",
    "https://i.ibb.co/396W95CW/IMG-20260204-WA0242.jpg",
    "https://i.ibb.co/pjY0ktQR/IMG-20260204-WA0243.jpg",
    "https://i.ibb.co/93qnfH5D/IMG-20260204-WA0244.jpg",
    "https://i.ibb.co/rfxnLRFk/IMG-20260204-WA0245.jpg",
    "https://i.ibb.co/C5Yrrnmq/IMG-20260204-WA0246.jpg",
    "https://i.ibb.co/gLBWP1tJ/IMG-20260204-WA0247.jpg",
    "https://i.ibb.co/qMWsDg2L/IMG-20260204-WA0248.jpg",
    "https://i.ibb.co/99dX2BBC/IMG-20260204-WA0249.jpg",
    "https://i.ibb.co/84511R2F/IMG-20260204-WA0250.jpg",
    "https://i.ibb.co/XkyJ5VDd/IMG-20260204-WA0251.jpg",
    "https://i.ibb.co/Ldxr8Z6Y/IMG-20260204-WA0252.jpg",
    "https://i.ibb.co/BVSvf1v2/IMG-20260204-WA0253.jpg",
    "https://i.ibb.co/zhf1rnG3/IMG-20260204-WA0254.jpg",
    "https://i.ibb.co/CpCTpMbP/IMG-20260204-WA0255.jpg",
    "https://i.ibb.co/DHZtZvNR/IMG-20260204-WA0256.jpg",
    "https://i.ibb.co/bTSgZkM/IMG-20260204-WA0257.jpg",
    "https://i.ibb.co/PZbC3YLv/IMG-20260204-WA0258.jpg",
    "https://i.ibb.co/TqrMLS2D/IMG-20260204-WA0259.jpg",
    "https://i.ibb.co/Mkktz4b6/IMG-20260204-WA0260.jpg",
    "https://i.ibb.co/Y7hhddTY/IMG-20260204-WA0261.jpg",
    "https://i.ibb.co/YF97wL8J/IMG-20260204-WA0262.jpg",
    "https://i.ibb.co/JwzLBFYQ/IMG-20260204-WA0263.jpg",
    "https://i.ibb.co/pvdkJhCq/IMG-20260204-WA0264.jpg",
    "https://i.ibb.co/ynZscbs8/IMG-20260204-WA0265.jpg",
    "https://i.ibb.co/XrrxbtvN/IMG-20260204-WA0266.jpg",
    "https://i.ibb.co/ch2n6sHS/IMG-20260204-WA0267.jpg",
    "https://i.ibb.co/5hKm8DNh/IMG-20260204-WA0268.jpg",
    "https://i.ibb.co/mFHh4L2F/IMG-20260204-WA0269.jpg",
    "https://i.ibb.co/NgKNtzpP/IMG-20260204-WA0270.jpg",
    "https://i.ibb.co/2Yn5QSVQ/IMG-20260204-WA0271.jpg",
    "https://i.ibb.co/fVGbzvFx/IMG-20260204-WA0272.jpg",
    "https://i.ibb.co/SXmySJzB/IMG-20260204-WA0273.jpg",
    "https://i.ibb.co/HTpVqYhd/IMG-20260204-WA0274.jpg",
    "https://i.ibb.co/QvPp0LPL/IMG-20260204-WA0275.jpg",
    "https://i.ibb.co/WNbhQqXg/IMG-20260204-WA0276.jpg",
    "https://i.ibb.co/m5dmbN5J/IMG-20260204-WA0277.jpg",
    "https://i.ibb.co/DfQbbxv1/IMG-20260204-WA0278.jpg",
    "https://i.ibb.co/QjJW3C6W/IMG-20260204-WA0279.jpg",
    "https://i.ibb.co/PGcnC97g/IMG-20260204-WA0280.jpg",
    "https://i.ibb.co/99BwGN4c/IMG-20260204-WA0281.jpg",
    "https://i.ibb.co/cKf9yMsW/IMG-20260204-WA0282.jpg",
    "https://i.ibb.co/rK51DdHY/IMG-20260204-WA0283.jpg",
    "https://i.ibb.co/5hyLW6ys/IMG-20260204-WA0284.jpg",
    "https://i.ibb.co/vxk4Cn6b/IMG-20260204-WA0285.jpg",
    "https://i.ibb.co/rRbxnJQS/IMG-20260204-WA0286.jpg",
    "https://i.ibb.co/LdJ5ZLRj/IMG-20260204-WA0287.jpg",
    "https://i.ibb.co/G3GH9Vqy/IMG-20260204-WA0288.jpg",
    "https://i.ibb.co/bjMhZQnW/IMG-20260204-WA0289.jpg",
    "https://i.ibb.co/YF7z1tFS/IMG-20260204-WA0290.jpg",
    "https://i.ibb.co/HThx97Z0/IMG-20260204-WA0291.jpg",
    "https://i.ibb.co/8g8hsRnS/IMG-20260204-WA0292.jpg",
    "https://i.ibb.co/1td1Ct7k/IMG-20260204-WA0293.jpg",
    "https://i.ibb.co/Y4zWnh75/IMG-20260204-WA0294.jpg",
    "https://i.ibb.co/93wpY9LG/IMG-20260204-WA0295.jpg",
    "https://i.ibb.co/kgsM02yL/IMG-20260204-WA0296.jpg",
    "https://i.ibb.co/bMc8bk33/IMG-20260204-WA0297.jpg",
    "https://i.ibb.co/rRmdwwQM/IMG-20260204-WA0298.jpg",
    "https://i.ibb.co/q3QzZN2T/IMG-20260204-WA0299.jpg",
    "https://i.ibb.co/KzVGmBPV/IMG-20260204-WA0300.jpg",
    "https://i.ibb.co/Rpw3cQdJ/IMG-20260204-WA0301.jpg",
    "https://i.ibb.co/fzQSRthN/IMG-20260204-WA0302.jpg",
    "https://i.ibb.co/nMy4FSfn/IMG-20260204-WA0303.jpg",
    "https://i.ibb.co/5XVc7dhK/IMG-20260204-WA0304.jpg",
    "https://i.ibb.co/1Gynm0Ms/IMG-20260204-WA0305.jpg",
    "https://i.ibb.co/1GNcjp0D/IMG-20260204-WA0306.jpg",
    "https://i.ibb.co/TxtJ77Z8/IMG-20260204-WA0307.jpg",
    "https://i.ibb.co/bjx13NDc/IMG-20260204-WA0308.jpg",
    "https://i.ibb.co/6RTT1VZ9/IMG-20260204-WA0309.jpg",
    "https://i.ibb.co/fGtvG6v5/IMG-20260204-WA0310.jpg",
    "https://i.ibb.co/6cXBTbX2/IMG-20260204-WA0311.jpg",
    "https://i.ibb.co/pj93Bc4C/IMG-20260204-WA0312.jpg",
    "https://i.ibb.co/JR94bbc1/IMG-20260204-WA0313.jpg",
    "https://i.ibb.co/xKy9nFqM/IMG-20260204-WA0314.jpg",
    "https://i.ibb.co/G3W1X6LG/IMG-20260204-WA0315.jpg",
    "https://i.ibb.co/FLtRkdfh/IMG-20260204-WA0316.jpg",
    "https://i.ibb.co/nNgTj1zj/IMG-20260204-WA0317.jpg",
    "https://i.ibb.co/N2B9BLMw/IMG-20260204-WA0318.jpg",
    "https://i.ibb.co/JWWHPzsq/IMG-20260204-WA0319.jpg",
    "https://i.ibb.co/xtYShFTP/IMG-20260204-WA0320.jpg",
    "https://i.ibb.co/VY0YW5zN/IMG-20260204-WA0321.jpg",
    "https://i.ibb.co/fzrBSF3D/IMG-20260204-WA0322.jpg",
    "https://i.ibb.co/zVJ21L0Z/IMG-20260204-WA0323.jpg",
    "https://i.ibb.co/4wDLjbb2/IMG-20260204-WA0324.jpg",
    "https://i.ibb.co/kVvwky1K/IMG-20260204-WA0325.jpg",
    "https://i.ibb.co/bM3JK52L/IMG-20260204-WA0326.jpg",
    "https://i.ibb.co/RGJjv5rd/IMG-20260204-WA0327.jpg",
    "https://i.ibb.co/jZ6p48PJ/IMG-20260204-WA0328.jpg",
    "https://i.ibb.co/20Hfv39B/IMG-20260204-WA0329.jpg",
    "https://i.ibb.co/LzVgnVNM/IMG-20260204-WA0330.jpg",
    "https://i.ibb.co/PzfD9Rzv/IMG-20260204-WA0331.jpg",
    "https://i.ibb.co/WNh0JP1J/IMG-20260204-WA0332.jpg",
    "https://i.ibb.co/MknMtQSb/IMG-20260204-WA0333.jpg",
    "https://i.ibb.co/HfLMvHmP/IMG-20260204-WA0334.jpg",
    "https://i.ibb.co/TMB2yz5Q/IMG-20260204-WA0335.jpg",
    "https://i.ibb.co/YTZBjG7R/IMG-20260204-WA0336.jpg",
    "https://i.ibb.co/GQVhGDRD/IMG-20260204-WA0337.jpg",
    "https://i.ibb.co/4n6yVy70/IMG-20260204-WA0338.jpg"
];

window.products = productImages.map((img, index) => {
    const modelId = `U-${String(index + 1).padStart(3, '0')}`;
    return {
        id: index + 1,
        modelId: modelId,
        title: modelId, // Simplified title to just ID
        displayTitle: `Diseño: ${modelId}`,
        image: img,
        basePrice: 55000,
        description: "Uniforme profesional personalizable. Incluye camiseta, pantaloneta y medias."
    };
});

window.colombiaProducts = [
    "https://i.ibb.co/K3BnmrV/Whats-App-Image-2026-02-04-at-3-10-33-PM.jpg",
    "https://i.ibb.co/CKZ5svFq/Whats-App-Image-2026-02-04-at-3-11-34-PM-1.jpg",
    "https://i.ibb.co/bxYHnyb/Whats-App-Image-2026-02-04-at-3-11-34-PM-2.jpg",
    "https://i.ibb.co/7x6RjjZ6/Whats-App-Image-2026-02-04-at-3-11-34-PM-3.jpg",
    "https://i.ibb.co/7x6PJvFD/Whats-App-Image-2026-02-04-at-3-11-34-PM-4.jpg",
    "https://i.ibb.co/4wPtN79Q/Whats-App-Image-2026-02-04-at-3-11-34-PM.jpg",
    "https://i.ibb.co/7tr0FtRF/Whats-App-Image-2026-02-04-at-3-11-35-PM.jpg",
    "https://i.ibb.co/x8j2dFsY/Whats-App-Image-2026-02-05-at-1-02-42-PM.jpg"
].map((img, index) => {
    const modelId = `COL-${String(index + 1).padStart(2, '0')}`;
    return {
        id: `col-${index + 1}`,
        modelId: modelId,
        title: modelId,
        displayTitle: `Diseño: ${modelId}`,
        image: img,
        basePrice: 55000,
        description: "Edición especial Selección Colombia. Camiseta y pantaloneta."
    };
});

window.ninosProducts = [
    "https://i.ibb.co/Xft7V6bF/Whats-App-Image-2026-02-12-at-11-12-35-AM.jpg",
    "https://i.ibb.co/p5KFtsf/Whats-App-Image-2026-02-12-at-11-12-36-AM-1.jpg",
    "https://i.ibb.co/Mxf6RNS8/Whats-App-Image-2026-02-12-at-11-12-36-AM.jpg",
    "https://i.ibb.co/JjCqWW0x/Whats-App-Image-2026-02-12-at-11-12-37-AM-1.jpg",
    "https://i.ibb.co/s9YfXzg7/Whats-App-Image-2026-02-12-at-11-12-37-AM.jpg",
    "https://i.ibb.co/4ZmGyHdy/Whats-App-Image-2026-02-12-at-11-12-38-AM.jpg",
    "https://i.ibb.co/HTBqrDx0/Whats-App-Image-2026-02-12-at-11-12-39-AM-1.jpg",
    "https://i.ibb.co/4ZNb0TtF/Whats-App-Image-2026-02-12-at-11-12-39-AM.jpg",
    "https://i.ibb.co/pB6Rp7qQ/Whats-App-Image-2026-02-12-at-11-12-40-AM-1.jpg",
    "https://i.ibb.co/YFt1RvNj/Whats-App-Image-2026-02-12-at-11-12-40-AM.jpg",
    "https://i.ibb.co/6JDkYM9r/Whats-App-Image-2026-02-12-at-11-12-41-AM-1.jpg",
    "https://i.ibb.co/Cs6VNV7p/Whats-App-Image-2026-02-12-at-11-12-41-AM.jpg",
    "https://i.ibb.co/27TqjN7c/Whats-App-Image-2026-02-12-at-11-12-42-AM.jpg"
].map((img, index) => {
    const modelId = `KIDS-${String(index + 1).padStart(2, '0')}`;
    return {
        id: `kids-${index + 1}`,
        modelId: modelId,
        title: modelId,
        displayTitle: `Diseño: ${modelId}`,
        image: img,
        basePrice: 55000,
        description: "Uniforme de niño personalizable."
    };
});

// Global State
let currentProduct = null;
let currentSize = null;
let currentQuantity = 1;
let cart = JSON.parse(localStorage.getItem('m23_cart')) || [];
let isPrintingEnabled = false;

// --- 2. INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    // A. Inject Cart UI
    injectCartHTML();
    updateCartUI();

    // B. Mobile Menu Logic
    initMobileMenu();

    // C. Scroll Animations
    initScrollReveal();

    // D. Catalog Rendering (if present)
    const catalogGrid = document.getElementById('catalog-grid');
    if (catalogGrid) renderCatalog(catalogGrid);

    const colombiaGrid = document.getElementById('colombia-catalog-grid');
    if (colombiaGrid) renderColombiaCatalog(colombiaGrid);

    // Function to open WhatsApp with specific product message
    window.openChatWithProduct = function (modelId) {
        const phoneNumber = "573009726067"; // Tu número de WhatsApp
        const message = `Hola, me interesa el uniforme Diseño ${modelId}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    // E. Product Detail Logic (if present)
    const detailTitle = document.getElementById('detailTitle');
    if (detailTitle) {
        initProductDetailPage();
    }

    // F. Contact Form (if present)
    initContactForm();

    // G. Colombia Modal
    initColombiaModal();

    // H. Ninos Modal
    initNinosModal();

    // I. Ninos Rendering
    const ninosGrid = document.getElementById('ninos-catalog-grid');
    if (ninosGrid) renderNinosCatalog(ninosGrid);
});


// --- 3. CORE FUNCTIONS ---

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }
}

// Scroll Reveal
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.product-card, .step-card, .testimonial-card, .section-title');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once
}

// Catalog
function renderCatalog(container) {
    window.products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-model', product.modelId);

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-overlay">
                    <a href="product.html?id=${product.id}" class="btn-icon"><i class="fas fa-eye"></i></a>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.title}</h3>
                <p class="price">Desde $${product.basePrice.toLocaleString('es-CO')}</p>
                
                <div class="card-actions" style="display: flex; flex-direction: column; gap: 8px; margin-top: 15px;">
                    <button onclick="window.openChatWithProduct('${product.modelId}')" class="btn-chat-product" style="background: var(--primary); color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer; width: 100%; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.3s;">
                        <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
                    </button>
                    <a href="product.html?id=${product.id}" class="btn-link" style="text-align: center; display: block; border: 1px solid var(--primary); padding: 8px; border-radius: 5px; color: var(--primary); background: transparent;">
                        VER DETALLES
                    </a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderColombiaCatalog(container) {
    window.colombiaProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-model', product.modelId);

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-overlay">
                    <button onclick="window.openChatWithProduct('${product.modelId}')" class="btn-icon"><i class="fab fa-whatsapp"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.title}</h3>
                <p class="price">$${product.basePrice.toLocaleString('es-CO')}</p>
                
                <div class="card-actions" style="display: flex; flex-direction: column; gap: 8px; margin-top: 15px;">
                    <button onclick="window.openChatWithProduct('${product.modelId}')" class="btn-chat-product" style="background: var(--primary); color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer; width: 100%; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.3s;">
                        <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
                    </button>
                    <!-- Detail button points to chat for now as there is no specific page -->
                    <button onclick="window.openChatWithProduct('${product.modelId}')" class="btn-link" style="text-align: center; display: block; border: 1px solid var(--primary); padding: 8px; border-radius: 5px; color: var(--primary); background: transparent; width: 100%; cursor: pointer;">
                        VER DETALLES
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderNinosCatalog(container) {
    window.ninosProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-model', product.modelId);

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-overlay">
                    <button onclick="window.openChatWithProduct('${product.modelId}')" class="btn-icon"><i class="fab fa-whatsapp"></i></button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.title}</h3>
                <p class="price">$${product.basePrice.toLocaleString('es-CO')}</p>
                
                <div class="card-actions" style="display: flex; flex-direction: column; gap: 8px; margin-top: 15px;">
                    <button onclick="window.openChatWithProduct('${product.modelId}')" class="btn-chat-product" style="background: var(--primary); color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer; width: 100%; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.3s;">
                        <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
                    </button>
                    <!-- Detail button points to chat for now as there is no specific page -->
                    <button onclick="window.openChatWithProduct('${product.modelId}')" class="btn-link" style="text-align: center; display: block; border: 1px solid var(--primary); padding: 8px; border-radius: 5px; color: var(--primary); background: transparent; width: 100%; cursor: pointer;">
                        VER DETALLES
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Product Detail Page Logic
function initProductDetailPage() {
    console.log("Initializing Product Detail Page...");
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Find Product
    if (!productId) {
        document.getElementById('detailTitle').innerText = "Producto no encontrado";
        return;
    }

    const product = products.find(p => p.id == productId);
    if (!product) {
        document.getElementById('detailTitle').innerText = "Producto no válido";
        return;
    }

    // Set Global State
    currentProduct = product;

    // Update UI Elements
    document.getElementById('detailTitle').innerText = product.title;
    document.getElementById('detailBasePrice').innerText = `$${product.basePrice.toLocaleString('es-CO')}`;
    document.getElementById('detailImg').src = product.image;

    // Update Price Logic - wait for inputs to exist? They should be in HTML already.
    updateProductPrice();
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            alert('¡Gracias! Tu mensaje simulado ha sido enviado.');
            contactForm.reset();
        });
    }
}


// --- 4. GLOBAL HELPER FUNCTIONS (Exposed to Window) ---

// Update Price Logic for Product Detail (Multi-Size)
window.updateSizeQty = function (size, change) {
    const input = document.getElementById(`qty-${size}`);
    if (!input) return;

    let newVal = (parseInt(input.value) || 0) + change;
    if (newVal < 0) newVal = 0;
    input.value = newVal;

    updateProductPrice();
};

window.updateProductPrice = function () {
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    let totalQty = 0;

    // Sum quantities
    sizes.forEach(size => {
        const input = document.getElementById(`qty-${size}`);
        if (input) {
            totalQty += parseInt(input.value) || 0;
        }
    });

    currentQuantity = totalQty;

    // Update UI Total Unit Display
    const totalUnitsDisplay = document.getElementById('totalUnitsDisplay');
    if (totalUnitsDisplay) totalUnitsDisplay.innerText = totalQty;

    const unitPrice = 55000;
    let finalTotal = 0;
    let messageHTML = '';

    // Checkbox state (Global Print Toggle for Cart logic can persist, or we use local toggle for visualization)
    // For Multi-Add, better to use just the toggle check
    const existingCheckbox = document.getElementById('printCheck');
    const isChecked = existingCheckbox ? existingCheckbox.checked : false;

    // DOM Elements for Summary
    const summaryPrint = document.getElementById('summaryPrint');
    const summaryDiscount = document.getElementById('summaryDiscount');
    const summaryTotalDisplay = document.getElementById('summaryTotalDisplay');
    const discountRow = document.getElementById('discountRow');
    const printRow = document.getElementById('printRow');
    const totalPriceEl = document.getElementById('detailTotalPrice');
    const dynamicOptions = document.getElementById('dynamicOptions');

    // Logic: Quantity >= 6
    if (currentQuantity >= 6) {
        // Wholesale Logic (15% OFF)
        const baseTotal = unitPrice * currentQuantity;
        const discountAmount = baseTotal * 0.15;
        finalTotal = baseTotal - discountAmount;

        // Update Summary
        if (printRow) printRow.style.display = 'none';
        if (discountRow) discountRow.style.display = 'flex';
        if (summaryDiscount) summaryDiscount.innerText = `-$${Math.round(discountAmount).toLocaleString('es-CO')}`;

        messageHTML = `
            <div class="wholesale-info">
                <strong>¡Descuento aplicado: 15% por compra al por mayor!</strong><br>
                Incluye estampado y medias sin costo adicional.
            </div>
        `;
    } else {
        // Retail Logic
        let printCost = 0;
        if (isChecked) {
            printCost = 5000 * currentQuantity;
        }
        finalTotal = (unitPrice * currentQuantity) + printCost;

        // Update Summary
        if (printRow) printRow.style.display = 'flex';
        if (discountRow) discountRow.style.display = 'none';
        if (summaryPrint) summaryPrint.innerText = `+$${printCost.toLocaleString('es-CO')}`;

        messageHTML = `
            <div class="checkbox-container">
                <input type="checkbox" id="printCheck" ${isChecked ? 'checked' : ''} onchange="updateProductPrice()">
                <label for="printCheck">Agregar estampado (+$5.000 COP por unidad)</label>
            </div>
        `;
    }

    // Dynamic Options Render
    if (dynamicOptions) {
        // Prevent clearing checkbox state if it exists, only update if wholesale state changes
        const isWholesaleMode = currentQuantity >= 6;
        const currentContentIsWholesale = dynamicOptions.innerHTML.includes('wholesale-info');

        if ((isWholesaleMode && !currentContentIsWholesale) || (!isWholesaleMode && (currentContentIsWholesale || dynamicOptions.innerHTML.trim() === ''))) {
            dynamicOptions.innerHTML = messageHTML;
        }
    }

    // Update Totals
    const totalStr = `$${Math.round(finalTotal).toLocaleString('es-CO')}`;
    if (totalPriceEl) totalPriceEl.innerText = totalStr;
    if (summaryTotalDisplay) {
        summaryTotalDisplay.innerText = totalStr;
        summaryTotalDisplay.style.color = currentQuantity >= 6 ? '#2e7d32' : 'var(--secondary)';
    }
};

window.addToCart = function () {
    if (!currentProduct) {
        alert("⚠️ Error: No se ha cargado el producto correctamente.");
        return;
    }

    // Validate: At least one item selected
    if (currentQuantity === 0) {
        alert("⚠️ Por favor selecciona al menos una unidad.");
        return;
    }

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    let itemsAdded = 0;

    sizes.forEach(size => {
        const input = document.getElementById(`qty-${size}`);
        const qty = parseInt(input ? input.value : 0) || 0;

        if (qty > 0) {
            const item = {
                id: currentProduct.id,
                title: currentProduct.title,
                image: currentProduct.image,
                basePrice: 55000,
                size: size,
                quantity: qty
            };

            // Merge duplicate
            const existingIndex = cart.findIndex(i => i.id === item.id && i.size === item.size);
            if (existingIndex > -1) {
                cart[existingIndex].quantity += item.quantity;
            } else {
                cart.push(item);
            }
            itemsAdded++;

            // Reset input visual
            if (input) input.value = 0;
        }
    });

    if (itemsAdded > 0) {
        saveCart();
        toggleCart();
        updateProductPrice(); // Reset UI totals
    }
};


// --- 5. CART SYSTEM IMPL (Global) ---

function injectCartHTML() {
    if (document.getElementById('cartSidebar')) return;

    const div = document.createElement('div');
    div.innerHTML = `
        <!-- Floating Button -->
        <div class="floating-cart-btn" onclick="toggleCart()">
            <i class="fas fa-shopping-cart"></i>
            <div class="cart-badge" id="cartBadge">0</div>
        </div>

        <!-- Sidebar Overlay & Cart -->
        <div class="cart-sidebar-overlay" id="cartOverlay" onclick="toggleCart()"></div>
        <div class="cart-sidebar" id="cartSidebar">
            <div class="cart-header">
                <h2><i class="fas fa-shopping-bag"></i> TU PEDIDO</h2>
                <button class="close-cart" onclick="toggleCart()">&times;</button>
            </div>
            
            <div class="cart-items-container" id="cartItemsContainer"></div>

            <div class="cart-footer">
                <!-- Printing Toggle -->
                <div class="checkbox-container" id="cartPrintContainer" style="margin-bottom: 15px; padding: 10px; background: #e3f2fd; border-radius: 6px; border: 1px solid #bbdefb; display: none;">
                    <input type="checkbox" id="globalPrintCheck" onchange="togglePrinting()">
                    <label for="globalPrintCheck" style="font-size: 0.9rem; color: #0d47a1; font-weight: bold; cursor: pointer;">
                        ¿Agregar estampado a todos? (+$5.000/u)
                    </label>
                    <div style="font-size: 0.8rem; margin-top: 5px; color: #555;">(Gratis si llevas 6 o más unidades)</div>
                </div>

                <div id="cartDiscountMsg" class="cart-discount" style="display: none;">
                    <span><i class="fas fa-gift"></i> Descuento Mayorista (15%)</span>
                    <span>APLICADO</span>
                </div>

                <div class="cart-summary-row">
                    <span>Subtotal:</span>
                    <span id="cartSubtotal">$0</span>
                </div>
                <div class="cart-summary-row" id="cartPrintRow" style="display:none;">
                    <span>Estampado:</span>
                    <span id="cartPrintCost">$0</span>
                </div>
                <div class="cart-total">
                    <span>TOTAL:</span>
                    <span id="cartTotal">$0</span>
                </div>

                <button class="btn-checkout" onclick="checkoutWhatsApp()">
                    <i class="fab fa-whatsapp"></i> TERMINAR COMPRA POR WHATSAPP
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(div);
}

window.toggleCart = function () {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    if (overlay && sidebar) {
        overlay.classList.toggle('active');
        sidebar.classList.toggle('active');
        updateCartUI();
    }
};

window.togglePrinting = function () {
    const checkbox = document.getElementById('globalPrintCheck');
    if (checkbox) {
        isPrintingEnabled = checkbox.checked;
        updateCartUI();
    }
};

window.removeFromCart = function (index) {
    if (confirm('¿Eliminar este producto?')) {
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
    }
};

window.updateCartItemQty = function (index, change) {
    const newQty = cart[index].quantity + change;
    if (newQty < 1) return;
    cart[index].quantity = newQty;
    saveCart();
    updateCartUI();
};

function saveCart() {
    localStorage.setItem('m23_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const container = document.getElementById('cartItemsContainer');
    const badge = document.getElementById('cartBadge');

    if (!container) return;

    // Calc Totals
    let totalQty = 0;
    let subtotal = 0;

    cart.forEach(item => {
        totalQty += item.quantity;
        subtotal += (item.basePrice * item.quantity);
    });

    // Badge
    if (badge) {
        badge.innerText = totalQty;
        badge.style.display = totalQty > 0 ? 'flex' : 'none';
    }

    // Render Items
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-msg">
                <i class="fas fa-shopping-basket"></i>
                <p>Tu carrito está vacío.</p>
                <button onclick="toggleCart()" class="btn-link" style="margin-top:10px;">Ver Catálogo</button>
            </div>
        `;
        const footer = document.querySelector('.cart-footer');
        if (footer) {
            footer.style.opacity = '0.5';
            footer.style.pointerEvents = 'none';
        }
    } else {
        const footer = document.querySelector('.cart-footer');
        if (footer) {
            footer.style.opacity = '1';
            footer.style.pointerEvents = 'all';
        }

        container.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" class="cart-item-img" alt="Foto">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-meta">Talla: <strong>${item.size}</strong></div>
                    <div class="cart-item-price">$${(item.basePrice * item.quantity).toLocaleString('es-CO')}</div>
                    
                    <div class="cart-controls" style="margin-top: 8px;">
                        <button class="cart-qty-btn" onclick="updateCartItemQty(${index}, -1)">−</button>
                        <span style="font-weight:bold; width: 30px; text-align:center;">${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="updateCartItemQty(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
    }

    // Advanced Pricing Logic (Global)
    const isWholesale = totalQty >= 6;

    const printCheckContainer = document.getElementById('cartPrintContainer');
    const printRow = document.getElementById('cartPrintRow');
    const printCostEl = document.getElementById('cartPrintCost');
    const discountMsg = document.getElementById('cartDiscountMsg');

    let printingCost = 0;

    if (isWholesale) {
        if (printCheckContainer) printCheckContainer.style.display = 'none'; // Auto included
        if (printRow) printRow.style.display = 'flex';
        if (printCostEl) {
            printCostEl.innerText = "¡GRATIS!";
            printCostEl.style.color = '#2e7d32';
        }
        if (discountMsg) discountMsg.style.display = 'flex';
    } else {
        if (printCheckContainer) printCheckContainer.style.display = 'block'; // Option available
        if (printRow) printRow.style.display = isPrintingEnabled ? 'flex' : 'none';
        if (isPrintingEnabled) {
            printingCost = 5000 * totalQty;
            if (printCostEl) {
                printCostEl.innerText = `+$${printingCost.toLocaleString('es-CO')}`;
                printCostEl.style.color = '#555';
            }
        }
        if (discountMsg) discountMsg.style.display = 'none';
    }

    // Discount Logic
    let discount = 0;
    if (isWholesale) {
        discount = subtotal * 0.15;
    }

    const finalTotal = subtotal + printingCost - discount;

    // Update Text
    if (document.getElementById('cartSubtotal')) document.getElementById('cartSubtotal').innerText = `$${subtotal.toLocaleString('es-CO')}`;
    if (document.getElementById('cartTotal')) document.getElementById('cartTotal').innerText = `$${Math.round(finalTotal).toLocaleString('es-CO')}`;
}

window.checkoutWhatsApp = function () {
    if (cart.length === 0) return;

    let msg = `*HOLA M23 SPORT, QUIERO HACER UN PEDIDO:*%0A%0A`;

    cart.forEach((item, i) => {
        msg += `🔹 *${item.quantity}x ${item.title}* (Talla ${item.size})%0A`;
    });

    const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);
    const isWholesale = totalQty >= 6;

    const subtotal = cart.reduce((sum, i) => sum + (i.basePrice * i.quantity), 0);
    let printCost = 0;
    let discount = 0;

    if (isWholesale) {
        discount = subtotal * 0.15;
        msg += `%0A🎁 *Descuento Mayorista (15%) Aplicado*`;
        msg += `%0A✅ *Estampado y Medias INCLUIDOS*`;
    } else {
        if (isPrintingEnabled) {
            printCost = 5000 * totalQty;
            msg += `%0A👕 *Con Estampado Adicional* (+$${printCost.toLocaleString()})`;
        }
    }

    const finalTotal = subtotal + printCost - discount;

    msg += `%0A%0A💰 *TOTAL A PAGAR: $${Math.round(finalTotal).toLocaleString('es-CO')}*`;
    msg += `%0A%0A📝 *Mis Datos:*%0A(Escribe tu nombre y dirección aquí)`;

    window.open(`https://wa.me/573009726067?text=${msg}`, '_blank');
};


// --- 6. DIRECT WHATSAPP ORDER (New Implementation) ---
window.sendDirectWhatsAppOrder = function () {
    if (!currentProduct) {
        alert("⚠️ Error: No se ha cargado el producto correctamente.");
        return;
    }

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    let messageItems = "";
    let totalQty = 0;
    let selectedSizes = [];

    // Collect configured sizes
    sizes.forEach(size => {
        const input = document.getElementById(`qty-${size}`);
        const qty = parseInt(input ? input.value : 0) || 0;
        if (qty > 0) {
            selectedSizes.push({ size: size, qty: qty });
            messageItems += `Talla ${size}: ${qty} unid.%0A`;
            totalQty += qty;
        }
    });

    if (totalQty === 0) {
        alert("⚠️ Por favor selecciona al menos una talla para continuar.");
        return;
    }

    // Calculate Totals based on current selection
    const unitPrice = 55000;
    const baseTotal = unitPrice * totalQty;
    let discount = 0;
    let printCost = 0;
    
    // Check wholesale
    const isWholesale = totalQty >= 6;
    
    // Check print status (visual only for this flow, unless we want to enforce it)
    const printCheckbox = document.getElementById('printCheck');
    const includePrint = printCheckbox ? printCheckbox.checked : false;

    let msg = `*HOLA M23 SPORT, QUIERO COMPRAR ESTE UNIFORME:*%0A%0A`;
    // Use the model ID or title
    msg += `⚽ *Modelo:* ${currentProduct.title}%0A`;
    msg += `📋 *Detalle del Pedido:*%0A${messageItems}`;
    msg += `🔢 *Total Unidades:* ${totalQty}%0A`;

    if (isWholesale) {
        discount = baseTotal * 0.15;
        msg += `%0A🎁 *Descuento Mayorista (15%) Aplicado*`;
        msg += `%0A✅ *Estampado y Medias INCLUIDOS GRATIS*`;
    } else {
        if (includePrint) {
            printCost = 5000 * totalQty;
            msg += `%0A👕 *Con Estampado Adicional* (+$${printCost.toLocaleString('es-CO')})`;
        } else {
             // Optional: msg += `%0A(Sin estampado adicional)`;
        }
    }

    const finalTotal = baseTotal + printCost - discount;

    msg += `%0A%0A💰 *TOTAL A PAGAR: $${Math.round(finalTotal).toLocaleString('es-CO')}*`;
    
    // Removed address request as per user instructions
    // msg += `%0A%0A📝 *Mis Datos:*%0A(Escribe tu nombre y dirección aquí)`; 
    msg += `%0A%0A🤝 Quedo atento para coordinar el pago y envío.`;

    const phoneNumber = "573009726067";
    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');
};
