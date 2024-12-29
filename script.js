const token = "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"; // Replace with your API key
const userInput = document.getElementById("user-input");
const image = document.getElementById("t2i-image");
const button = document.getElementById("img-gen-btn");

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/kothariyashhh/GenAi-Texttoimage",
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        // Log error if the response status is not OK
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.blob();
    return result;
}

button.addEventListener("click", async () => {
    const inputText = userInput.value.trim(); // Trim whitespace from input

    if (!inputText) {
        button.textContent = "Please Provide Prompt"; // Inform user to provide input
        userInput.classList.add("input-guide");
        setTimeout(() => {
            button.textContent = "Generate Image"; // Reset button text after 2 seconds
            userInput.classList.remove("input-guide");
        }, 2000);
        return;
    }

    // Disable the button to prevent multiple clicks
    button.disabled = true;
    button.textContent = "Generating..."; // Optional: Update button text for better UX
    image.src = "loading.gif"; // Display a loading indicator

    query({ inputs: inputText })
        .then((response) => {
            const objectURL = URL.createObjectURL(response);
            image.src = objectURL; // Display the generated image
        })
        .catch((error) => {
            console.error("Error generating image:", error);
            image.src = ""; // Clear image if there's an error
        })
        .finally(() => {
            // Re-enable the button and reset its text
            button.disabled = false;
            button.textContent = "Generate Image"; // Reset button text
        });
});





// const token = "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";
// const inputTxt = document.getElementById("user-input");
// const image = document.getElementById("t2i-image");
// const button = document.getElementById("btn");

// async function query() {
//     //image.src = "/loading.gif";
//     const response = await fetch(
//         "https://api-inference.huggingface.co/models/kothariyashhh/GenAi-Texttoimage",
//         {
//             headers: { Authorization: `Bearer ${token}` },
//             method: "POST",
//             body: JSON.stringify({ "inputs": inputTxt.value }),
//         }
//     );
//     const result = await response.blob();
//     return result;
// }

// button.addEventListener('click', async function () {
//     query().then((response) => {
//         const objectURL = URL.createObjectURL(response);
//         image.src = objectURL;
//     });
// });
