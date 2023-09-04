const form = document.querySelector("#form");
const inputfile = document.querySelector('#file');
const uploadfile = document.querySelector(".upload-file");
const uploaded = document.querySelector(".uploaded");

form.onclick = e =>{
    inputfile.click()
}

inputfile.onchange = e =>{
    const filename = e.target.files[0].name;

    let xhr = new XMLHttpRequest();
    xhr.open('POST','file/upload', true);

    xhr.upload.onprogress = ({loaded, total})=>{
        loadedKB = Math.floor(loaded/1000);
        totalKB =  Math.floor(total/1000);
        size = totalKB < 1024? `${loadedKB} KB`: `${(loadedKB/1024).toFixed(2)} MB`
        percent = Math.floor(loadedKB/totalKB * 100);

        uploadfile.innerHTML = `   
                <i class="fas fa-file-alt"></i>
                <div class="content">
                    <div>
                        <span>${filename}</span>
                        <span>${percent}</span>
                    </div>
                    <div style="width: ${percent}" class="progress-bar"></div>
                </div>`;
    }

    xhr.onload = e =>{
        uploadfile.innerHTML = `   
                <div class="upload-file">
                    <i class="fas fa-file-alt"></i>
                    <div class="content">
                        <div>
                            <span>${filename}</span>
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="size">${size}</div>
                    </div>
                </div>`
    }

    let formData = new FormData(form);
    xhr.send(formData);
}