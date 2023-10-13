// Function to handle form submission and file upload
async function submitForm() {
  const formData = new FormData(document.getElementById('submission-form'));

  // Create a file upload promise
  const fileId = await uploadToFolder('your_folder_id', formData);

  // Display the success message with the file ID
  const successMessage = document.getElementById('success-message');
  const fileIdElement = document.getElementById('file-id');
  fileIdElement.textContent = fileId;
  successMessage.style.display = 'block';

  // You can also redirect to a thank you page here if needed
}

// Function to upload a file to the specified folder
async function uploadToFolder(folderId, formData) {
  const accessToken = 'your_access_token'; // Replace with a valid access token
  const endpoint = `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id`;

  // Create the multipart request
  const multipartRequestBody = createMultipartRequestBody(folderId, formData);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: multipartRequestBody,
    });

    const result = await response.json();
    return result.id;
  } catch (err) {
    console.error('File upload error:', err);
    throw err;
  }
}

// Function to create a multipart request body
function createMultipartRequestBody(folderId, formData) {
  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadata = {
    name: 'photo.jpg', // Replace with your desired file name
    mimeType: 'image/jpeg',
    parents: [folderId],
  };

  const metadataString = JSON.stringify(metadata);
  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    metadataString +
    delimiter +
    'Content-Type: image/jpeg\r\n\r\n' +
    formData.get('file').file +
    closeDelimiter;

  return multipartRequestBody;
}

// Add an event listener to the form submission
document.getElementById('submission-form').addEventListener('submit', (e) => {
  e.preventDefault();
  submitForm();
});
