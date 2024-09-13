// Model
const model = {
    array: [],
    hardware: ''
};

// View
const view = {
    displayResult: function (result) {
        document.getElementById('result').innerText = result;
    }
};

// Controller
const controller = {
    setArray: function (arrayString) {
        // Split input by commas and trim spaces
        model.array = arrayString.split(',').map(item => item.trim());
    },

    setHardware: function (hardware) {
        model.hardware = hardware;
    },

    processArray: function () {
        const array = model.array;
        const hardware = model.hardware;

        if (hardware === 'CPU') {
            let result = [];
            for (let i = 0; i < array.length; i += 2) {
                if (i + 1 < array.length && !isNaN(array[i]) && !isNaN(array[i + 1])) {
                    result.push(parseFloat(array[i]) + parseFloat(array[i + 1]));
                } else {
                    result.push(array[i]);
                    if (i + 1 < array.length) result.push(array[i + 1]);
                }
            }
            view.displayResult(`CPU result: ${result.join(', ')}`);
        } else if (hardware === 'GPU') {
            let result = [];
            for (let i = array.length - 1; i > 0; i -= 2) {
                if (isNaN(array[i]) && isNaN(array[i - 1])) {
                    result.push(array[i - 1] + array[i]);
                } else {
                    result.push(array[i]);
                    result.push(array[i - 1]);
                }
            }
            if (array.length % 2 !== 0) {
                result.push(array[0]);
            }
            view.displayResult(`GPU result: ${result.reverse().join(', ')}`);
        } else if (hardware === 'FPGA') {
            const half = Math.floor(array.length / 2);
            const firstHalf = array.slice(0, half);
            const secondHalf = array.slice(half).reverse();
            view.displayResult(`FPGA result: ${firstHalf.concat(secondHalf).join(', ')}`);
        } else {
            view.displayResult("Unknown hardware option");
        }
    }
};

// Function to process the array
function processArray() {
    const arrayInput = document.getElementById('arrayInput').value;
    const hardwareSelect = document.getElementById('hardwareSelect').value;

    controller.setArray(arrayInput);
    controller.setHardware(hardwareSelect);
    controller.processArray();
}
