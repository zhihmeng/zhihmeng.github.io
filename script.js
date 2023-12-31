<script>
    document.getElementById("apiForm").addEventListener("submit", function (e) {
        e.preventDefault();
        
        const text1 = document.getElementById("text1").value;
        const text2 = document.getElementById("text2").value;
        const text3 = document.getElementById("text3").value;
        
        // 发起API请求，传递三个文本参数
        fetch("zhihmeng.ddns.net:7861/sdapi/v1/txt2img", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "denoising_strength": 0,
                    "prompt": text1 + "," + text2 + "," + text3 + ",a cd cover",
                    "negative_prompt": "easy negative",
                    "seed": -1,
                    "batch_size": 2,
                    "n_iter": 1,
                    "steps": 50,
                    "cfg_scale": 7,
                    "width": 512,
                    "height": 512,
                    "restore_faces": false,
                    "tiling": false,
                    "override_settings": {
                    "sd_model_checkpoint" :"wlop-any.ckpt [7331f3bc87]"
                    },
                    "script_args": [
                    0,
                    true,
                    true,
                    "LoRA",
                    "dingzhenlora_v1(fa7c1732cc95)",
                    1,
                    1
                    ],
                    "sampler_index": "Euler"
                }
                )
        })
        .then(response => response.json())
        .then(data => {
            // 创建并展示图像
            const imageContainer = document.getElementById("imageContainer");
            imageContainer.innerHTML = "";
            
            for (let i = 0; i < 3; i++) {
                const img = document.createElement("img");
                img.src = `data:image/png;base64,${data[`image${i+1}`]}`;
                imageContainer.appendChild(img);
            }
        })
        .catch(error => console.error(error));
    });
</script>