// CSS Classes
const ID_FRONT_DIV = 'license-upload-front-div';
const ID_BACK_DIV = 'license-upload-back-div';
const ID_UPLOAD_EDIT_LINK = 'license-upload-edit-link';
const ID_PREVIEW_DIV = 'license-preview-div';
const ID_LABEL_DIV = 'license-label-div';

// Upload via Input type file
function fileUploadStartUp() {
    const licenseFront = document.getElementsByClassName('w-file-upload-input')[0];
    const licenseBack = document.getElementsByClassName('w-file-upload-input')[1];
    hideAllFileUploadStates();
    licenseFront.addEventListener('change', (e)=>{
        let dropArea = document.querySelector(`.${ID_FRONT_DIV}`);
        let dragText = dropArea.querySelector(".license-front-drag-text");
        dragText.textContent = 'Uploading...';
        console.log(`ID Front`);
        let file = e.target.files[0];
        idPreview(file, ID_FRONT_DIV);
        showEditLink('license-upload-edit-link');
    });

    licenseBack.addEventListener('change', (e)=>{
        document.getElementsByClassName('w-file-upload-default')[1].style.display = '';
        let dropArea = document.querySelector(`.${ID_BACK_DIV}`);
        let dragText = dropArea.querySelector(".license-back-drag-text");
        dragText.textContent = 'Uploading...';
        console.log(`ID Back`);
        console.log(e);
        let file = e.target.files[0];
        idPreview(file, ID_BACK_DIV);
        showEditLink('license-upload-edit-link');
    });
}

// Upload via Drag & Drop
function frontIdUploadStartUp() {
    hideEditLink(ID_FRONT_DIV);
    const dropArea = document.querySelector(`.${ID_FRONT_DIV}`);
    let dragText = dropArea.querySelector(".license-front-drag-text");
    let file;

    let licenseFrontEditLink = document.getElementsByClassName(ID_UPLOAD_EDIT_LINK)[0];
    // License Front Clear/Edit Link Handler
    licenseFrontEditLink.addEventListener("click", (e)=>{
        let previewDiv = dropArea.querySelector(`.${ID_PREVIEW_DIV}`);
        previewDiv.style.background = '';
        previewDiv.dataset.file = '';
        previewDiv.querySelector('div').style.display = '';

        // clear input value
        let inputDiv =  dropArea.querySelector('.w-file-upload-default');
        inputDiv.querySelector('input').value = '';
        inputDiv.style.display = '';

        resetFrontDragText(dropArea);
    });

    dropArea.addEventListener("dragover", (event)=>{
        event.preventDefault();
        dropArea.classList.add("active");
        dragText.textContent = "Release to Upload File";
    });

    dropArea.addEventListener("dragleave", ()=>{
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    });

    dropArea.addEventListener("drop", (event)=>{
        event.preventDefault();
        dragText.textContent = 'Uploading...';
        file = event.dataTransfer.files[0];
        console.log(`Front License: Got the file`);
        console.log(file);

        idPreview(file, ID_FRONT_DIV);
        showEditLink('license-upload-edit-link');
    });
}

// Upload via Drag & Drop
function backIdUploadStartUp() {
    hideEditLink(ID_BACK_DIV);
    const dropArea = document.querySelector(`.${ID_BACK_DIV}`);
    let dragText = dropArea.querySelector(".license-back-drag-text");
    let file;

    let licenseBackEditLink = document.getElementsByClassName(ID_UPLOAD_EDIT_LINK)[1];
    // License Back Clear/Edit Event Handler
    licenseBackEditLink.addEventListener("click", (e)=>{
        let previewDiv = dropArea.querySelector(`.${ID_PREVIEW_DIV}`);
        previewDiv.style.background = '';
        previewDiv.dataset.file = '';
        previewDiv.querySelector('div').style.display = '';
        // clear input value
        let inputDiv =  dropArea.querySelector('.w-file-upload-default');
        inputDiv.querySelector('input').value = '';
        inputDiv.style.display = '';

        resetBackDragText(dropArea);
    });

    dropArea.addEventListener("dragover", (event)=>{
        event.preventDefault();
        dropArea.classList.add("active");
        dragText.textContent = "Release to Upload File";
    });

    dropArea.addEventListener("dragleave", ()=>{
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    });

    dropArea.addEventListener("drop", (event)=>{
        event.preventDefault();
        dragText.textContent = 'Uploading...';
        file = event.dataTransfer.files[0];
        console.log(`Back License: Got the file`);
        console.log(file);
        showEditLink('license-upload-edit-link');
        idPreview(file, ID_BACK_DIV);
    });
}

function idPreview(file, parentClassName) {
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    const filesizeLimitInBytes = 4 * 1000 * 1000;
    const idParentDiv = document.querySelector(`.${parentClassName}`);
    const idPreviewDiv = idParentDiv.querySelector(`.${ID_PREVIEW_DIV}`);
    if (validExtensions.includes(fileType) && file.size <= filesizeLimitInBytes) {
        let fileReader = new FileReader();
        fileReader.onload = ()=>{
            let fileURL = fileReader.result;
            idPreviewDiv.dataset.file = fileURL;
            idPreviewDiv.style.background = `url(${fileURL}) no-repeat`;
            idPreviewDiv.style.backgroundSize = 'cover';
            idPreviewDiv.querySelector('div').style.display = 'none';
        }
        fileReader.readAsDataURL(file);

        // Show Edit/Clear Link
        idParentDiv.querySelector(`.${ID_LABEL_DIV}`).querySelector(`.${ID_UPLOAD_EDIT_LINK}`).style.display = '';
    } else {
        let dropArea = document.querySelector(`.${parentClassName}`);
        let dragText;
        if (parentClassName === ID_FRONT_DIV) {
            dragText = dropArea.querySelector(".license-front-drag-text");
        } else if (parentClassName === ID_BACK_DIV) {
            dragText = dropArea.querySelector(".license-back-drag-text");
        }
        dragText.textContent = 'Drag & Drop to Upload File';
        // Hide Edit/Clear Link
        idParentDiv.querySelector(`.${ID_LABEL_DIV}`).querySelector(`.${ID_UPLOAD_EDIT_LINK}`).style.display = 'none';
        alert("Please upload a .jpeg or .jpg or .png image file that is less than 4 MB.");
    }
}

// Helper Functions Begin

function showEditLink(className) {
    let editLink = document.querySelector(`.${className}`);
    editLink.style.display = '';
}

function hideEditLink(parentClassName) {
    let parent = document.querySelector(`.${parentClassName}`);
    parent.querySelector(`.${ID_LABEL_DIV}`).querySelector(`.${ID_UPLOAD_EDIT_LINK}`).style.display = 'none';
}

function resetBackDragText(dropArea) {
    let dragText = dropArea.querySelector(".license-back-drag-text");
    dragText.textContent = "Drag & Drop to Upload File";
}

function resetFrontDragText(dropArea) {
    let dragText = dropArea.querySelector(".license-front-drag-text");
    dragText.textContent = "Drag & Drop to Upload File";
}

function dragDropfileUploadStartUp() {
    frontIdUploadStartUp();
    backIdUploadStartUp();
}

function hideAllFileUploadStates() {
    // Remove unwanted ID Front File Upload States 
    document.getElementsByClassName('w-file-upload-uploading')[0].remove();
    document.getElementsByClassName('w-file-upload-success')[0].remove();
    document.getElementsByClassName('w-file-upload-error')[0].remove();
    // Remove unwanted ID Back File Upload States
    document.querySelector('.w-file-upload-uploading').remove();
    document.querySelector('.w-file-upload-success').remove();
    document.querySelector('.w-file-upload-error').remove();
}

// Helper Functions End

// Initialize
dragDropfileUploadStartUp();
fileUploadStartUp();
