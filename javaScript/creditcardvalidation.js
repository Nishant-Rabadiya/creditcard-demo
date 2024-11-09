const creditCardAllInput = document.querySelectorAll('.credit-card-all-input');
const userCardHolderName = document.getElementById('userCardHolderName');
const cardMonth = document.getElementById('cardMonth');
const cardYear = document.getElementById('cardYear');
const cardCVCnumber = document.getElementById('cardCVCnumber');
const userCardName = document.getElementById('userCardName');
const userCardNumber = document.getElementById('userCardNumber');

let creditCardData;
const getCreditCardData = async () => {
    const res = await fetch('http://localhost:3000/credit-card-details');
    creditCardData = await res.json();
}
getCreditCardData();

let isFlage = false;
let monthValue;
const dateFull = new Date();
const monthYearRegex = /^[0-9]{1,2}$/;
const cvcRegex = /^[0-9]{1,4}$/;
const cardRegex = /^[0-9\s]*$/;
const american = /^(?:3[47][0-9]{13})$/; // 15 numbers required
const visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/; // 16 numbers required
const mastercard = /^(?:5[1-5][0-9]{14})$/; // 16 numbers required
const discover = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/; // 15 numbers required
const dinersClub = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/; // 14 numbers required
const JCB = /^(?:(?:2131|1800|35\d{3})\d{11})$/; // 15 or 16 numbers required
const switchCardPattern = /^(4903|4905|4911|4936|6333|6759|564182|633110)\d{10,15}$/; // 15 or 16 numbers required
const laserCard = /^(6304|6706|6709|6771)[0-9]{12,15}$/;
const unionCard = /^(62[0-9]{14,17})$/;
const instaPaymentCard = /^63[7-9][0-9]{13}$/;

const flageManage = (flage) => {
    if (flage) {
        isFlage = flage;
    }
}

const cardholderNameInputError = (err, color, event, flage) => {
    if (event.type === "input") {
        event.target.nextElementSibling.innerHTML = err
        event.target.style.borderColor = color;
    } else {
        event.target.cardHolderName.nextElementSibling.innerHTML = err
        event.target.cardHolderName.style.borderColor = color;
        flageManage(flage);
    }
}

const cardMonthExpiryInputError = (err, color, event, flage) => {
    if (event.type === "input") {
        event.target.parentElement.parentElement.lastElementChild.innerHTML = err
        event.target.style.borderColor = color;
    } else {
        event.target.cardMonthExpiry.parentElement.parentElement.lastElementChild.innerHTML = err;
        event.target.cardMonthExpiry.style.borderColor = color;
        flageManage(flage);
    }
}

const cardYearExpiryInputError = (err, color, event, flage) => {
    if (event.type === "input") {
        event.target.parentElement.parentElement.lastElementChild.innerHTML = err
        event.target.style.borderColor = color;
    } else if (event.type = 'text') {
        event.target.cardMonthExpiry.parentElement.parentElement.lastElementChild.innerHTML = err
        event.target.cardMonthExpiry.style.borderColor = color
        event.target.cardYearExpiry.style.borderColor = color
    } else {
        event.target.cardMonthExpiry.parentElement.parentElement.lastElementChild.innerHTML = err;
        event.target.cardYearExpiry.style.borderColor = color;
        flageManage(flage);
    }
}

const cardCVCInputError = (err, color, event, flage) => {
    if (event.type === "input") {
        event.target.nextElementSibling.innerHTML = err
        event.target.style.borderColor = color;
    } else {
        event.target.cvcNumber.nextElementSibling.innerHTML = err;
        event.target.cvcNumber.style.borderColor = color;
        flageManage(flage);
    }
}

const cardNumberInputError = (err, color, event, flage) => {
    if (event.type === "input") {
        event.target.nextElementSibling.innerHTML = err
        event.target.style.borderColor = color;
    } else {
        event.target.cardNumberInput.nextElementSibling.innerHTML = err;
        event.target.cardNumberInput.style.borderColor = color;
        flageManage(flage);
    }
}

creditCardAllInput.forEach((input) => {
    input.addEventListener('input', (e) => {
        let value = e.target.value;
        if (e.target.id === "cardHolderName") {
            if (!value.trim()) {
                cardholderNameInputError("Cardholder name required!", "red", e);
            } else if (value.length < 8) {
                cardholderNameInputError("Cardholder name length must be atleast 8 characters", "red", e);
            } else if (value.length > 30) {
                cardholderNameInputError("Cardholder name length must not exceed 30 characters", "red", e);
            } else {
                cardholderNameInputError("", "gray", e);
            }
            value ? userCardHolderName.innerHTML = value : userCardHolderName.innerHTML = "Card holder name";
        }

        if (e.target.id === "cardMonthExpiry") {
            value = value.replace(/[^0-9]/g, '');
            value = value.length > 2 ? value.slice(0, 2) : value;
            e.target.value = value;
            monthValue = value;
            if (!value) {
                cardMonthExpiryInputError("Can't be blank", "red", e);
            } else if (value <= 0) {
                cardMonthExpiryInputError("Invalid month", "red", e);
            } else if (value > 12) {
                cardMonthExpiryInputError("Invalid month", "red", e);
            } else if (!monthYearRegex.test(value)) {
                cardMonthExpiryInputError("Numbers only", "red", e);
            } else {
                cardMonthExpiryInputError("", "gray", e);
            }
            cardMonth.innerHTML = value ? (value.padStart(2, '0')) : "00";
        }

        if (e.target.id === "cardYearExpiry") {
            value = value.replace(/[^0-9]/g, '');
            value = value.length > 2 ? value.slice(0, 2) : value;
            e.target.value = value;
            if (!value) {
                cardYearExpiryInputError("Can't be blank", "red", e);
            } else if (!monthYearRegex.test(value)) {
                cardYearExpiryInputError("Numbers only", "red", e);
            } else if (parseInt(value) < parseInt(dateFull.getFullYear().toString().substr(-2))) {
                cardYearExpiryInputError("Invalid year", "red", e);
            } else {
                cardYearExpiryInputError("", "gray", e);
            }
            if (parseInt(value) === parseInt(dateFull.getFullYear().toString().substr(-2))) {
                if (monthValue < dateFull.getMonth() + 1) {
                    cardYearExpiryInputError("Invalid month", "red", e);
                } else if (monthValue > 12) {
                    cardYearExpiryInputError("Invalid month", "red", e);
                } else {
                    cardYearExpiryInputError("", "gray", e);
                }
            }
            cardYear.innerHTML = value ? (value.padStart(2, '0')) : "00";
        }

        if (e.target.id === "cvcNumber") {
            value = value.replace(/[^0-9]/g, '');
            value = value.length > 4 ? value.slice(0, 4) : value;
            e.target.value = value;
            if (!value) {
                cardCVCInputError("Can't be blank", "red", e);
            } else if (!cvcRegex.test(value)) {
                cardCVCInputError("Numbers only", "red", e);
            } else if (value.length < 3) {
                cardCVCInputError("length must be atleast 3 number", "red", e);
            } else {
                cardCVCInputError("", "gray", e);
            }
            value ? cardCVCnumber.innerHTML = value : cardCVCnumber.innerHTML = "000";
        }

        if (e.target.id === "cardNumberInput") {
            const cardnumber = (inputtxt) => {
                if (american.test(inputtxt)) {
                    userCardName.innerHTML = "American Express";
                } else if (visa.test(inputtxt)) {
                    userCardName.innerHTML = "Visa";
                } else if (mastercard.test(inputtxt)) {
                    userCardName.innerHTML = "MasterCard";
                } else if (discover.test(inputtxt)) {
                    userCardName.innerHTML = "Discover";
                } else if (dinersClub.test(inputtxt)) {
                    userCardName.innerHTML = "Diners Club";
                } else if (JCB.test(inputtxt)) {
                    userCardName.innerHTML = "JCB";
                } else if (switchCardPattern.test(inputtxt)) {
                    userCardName.innerHTML = "Switch";
                } else if (laserCard.test(inputtxt)) {
                    userCardName.innerHTML = "Laser";
                } else if (unionCard.test(inputtxt)) {
                    userCardName.innerHTML = "Union";
                } else if (instaPaymentCard.test(inputtxt)) {
                    userCardName.innerHTML = "Insta Payment";
                } else {
                    if (!(american.test(inputtxt) || visa.test(inputtxt) || mastercard.test(inputtxt) || discover.test(inputtxt) || dinersClub.test(inputtxt) || JCB.test(inputtxt) || switchCardPattern.test(inputtxt) || laserCard.test(inputtxt) || unionCard.test(inputtxt) || instaPaymentCard.test(inputtxt))) {
                        userCardName.innerHTML = "";
                        cardNumberInputError("Please provide a valid card number!", "red", e);
                    } else {

                        cardNumberInputError("", "gray", e);
                    }
                }
            }
            value = value.replace(/\s+/g, '').replace(/\D/g, '');
            value = value.slice(0, 20);
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            cardnumber(value)
            const cursorPosition = input.selectionStart;
            const spaceCountBefore = (input.value.slice(0, cursorPosition).match(/\s/g) || []).length;
            input.value = formattedValue;
            const spaceCountAfter = (input.value.slice(0, cursorPosition).match(/\s/g) || []).length;
            const newCursorPosition = cursorPosition + (spaceCountAfter - spaceCountBefore);
            input.setSelectionRange(newCursorPosition, newCursorPosition);
            value = value.replace(/ /g, '');
            if (!value) {
                cardNumberInputError("Card number is required!", "red", e);
            } else if (!cardRegex.test(value)) {
                cardNumberInputError("Wrong format, numbers only", "red", e);
            } else if (value.length < 8) {
                cardNumberInputError("Card number length must be at least 8 numbers", "red", e);
            } else if (!(value.length === 13 || value.length === 14 || value.length === 15 || value.length === 16)) {
                cardNumberInputError("Invalid number", "red", e);
            } else if (!(american.test(value.replace(/ /g, '')) || visa.test(value.replace(/ /g, '')) || mastercard.test(value.replace(/ /g, '')) || discover.test(value.replace(/ /g, '')) || dinersClub.test(value.replace(/ /g, '')) || JCB.test(value.replace(/ /g, '')) || switchCardPattern.test(value.replace(/ /g, '')) || laserCard.test(value.replace(/ /g, '')) || unionCard.test(value.replace(/ /g, '')) || instaPaymentCard.test(value.replace(/ /g, '')))) {
                cardNumberInputError("Please provide a valid card numbers!", "red", e);
            } else {
                cardNumberInputError("", "gray", e);
            }
            value ? userCardNumber.innerHTML = value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ') : userCardNumber.innerHTML = "0000 0000 0000 0000";
        }
    });
});

const confirmDetails = (event) => {
    event.preventDefault();
    isFlage = false;
    if (event.target.cardHolderName) {
        if (!event.target.cardHolderName.value.trim()) {
            cardholderNameInputError("Cardholder name required!", "red", event, true);
        } else if (event.target.cardHolderName.value.length < 8) {
            cardholderNameInputError("Cardholder name length must be atleast 8 characters", "red", event, true);
        } else if (event.target.cardHolderName.value.length > 30) {
            cardholderNameInputError("Cardholder name length must not exceed 30 characters", "red", event, true);
        } else {
            cardholderNameInputError("", "gray", event);
        }
    }

    if (event.target.cardMonthExpiry) {
        if (!event.target.cardMonthExpiry.value.trim()) {
            cardMonthExpiryInputError("Can't be blank", "red", event, true);
        } else if (event.target.cardMonthExpiry.value <= 0) {
            cardMonthExpiryInputError("Invalid month", "red", event, true);
        } else if (event.target.cardMonthExpiry.value > 12) {
            cardMonthExpiryInputError("Invalid month", "red", event, true);
        } else if (!monthYearRegex.test(event.target.cardMonthExpiry.value)) {
            cardMonthExpiryInputError("Numbers only", "red", event, true);
        } else {
            cardMonthExpiryInputError("", "gray", event);
        }
    }

    if (event.target.cardYearExpiry) {
        if (!event.target.cardYearExpiry.value) {
            cardYearExpiryInputError("Can't be blank", "red", event, true);
        } else if (!monthYearRegex.test(event.target.cardYearExpiry.value)) {
            cardYearExpiryInputError("Numbers only", "red", event, true);
        } else if (parseInt(event.target.cardYearExpiry.value) < parseInt(dateFull.getFullYear().toString().substr(-2))) {
            cardYearExpiryInputError("Invalid year", "red", event, true);
        } else {
            cardYearExpiryInputError("", "gray", event);
        }
        if (parseInt(event.target.cardYearExpiry.value) === parseInt(dateFull.getFullYear().toString().substr(-2))) {
            if (monthValue < dateFull.getMonth() + 1) {
                cardMonthExpiryInputError("Invalid month", "red", event, true);
            } else if (monthValue > 12) {
                cardMonthExpiryInputError("Invalid month", "red", event, true);
            } else {
                cardMonthExpiryInputError("", "gray", event);
            }
        }
    }

    const findUserCreditCardNumber = creditCardData.find((item) => {
        return item.cardNumber === event.target.cardNumberInput.value.trim();
    });

    if (event.target.cvcNumber) {
        if (!event.target.cvcNumber.value) {
            cardCVCInputError("Can't be blank", "red", event, true);
        } else if (!cvcRegex.test(event.target.cvcNumber.value)) {
            cardCVCInputError("Numbers only", "red", event, true);
        } else if (event.target.cvcNumber.value.length < 3) {
            cardCVCInputError("length must be atleast 3 number", "red", event, true);
        } else {
            cardCVCInputError("", "gray", event);
        }
    }

    if (event.target.cardNumberInput) {
        if (!event.target.cardNumberInput.value) {
            cardNumberInputError("Card number is required!", "red", event, true);
        } else if (!cardRegex.test(event.target.cardNumberInput.value)) {
            cardNumberInputError("Wrong format, numbers only", "red", event, true);
        } else if (event.target.cardNumberInput.value.length < 8) {
            cardNumberInputError("Card number length must be at least 8 numbers", "red", event, true);
        } else if (!(event.target.cardNumberInput.value.length === 16 || event.target.cardNumberInput.value.length === 17 || event.target.cardNumberInput.value.length === 18 || event.target.cardNumberInput.value.length === 19)) {
            cardNumberInputError("Invalid number", "red", event, true);
        } else if (!(american.test(event.target.cardNumberInput.value.replace(/ /g, '')) || visa.test(event.target.cardNumberInput.value.replace(/ /g, '')) || mastercard.test(event.target.cardNumberInput.value.replace(/ /g, '')) || discover.test(event.target.cardNumberInput.value.replace(/ /g, '')) || dinersClub.test(event.target.cardNumberInput.value.replace(/ /g, '')) || JCB.test(event.target.cardNumberInput.value.replace(/ /g, '')) || switchCardPattern.test(event.target.cardNumberInput.value.replace(/ /g, '')) || laserCard.test(event.target.cardNumberInput.value.replace(/ /g, '')) || unionCard.test(event.target.cardNumberInput.value.replace(/ /g, '')) || instaPaymentCard.test(event.target.cardNumberInput.value.replace(/ /g, '')))) {
            cardNumberInputError("Please provide a valid card numbers!", "red", event, true);
        } else {
            cardNumberInputError("", "gray", event);
        }
    }

    if (isFlage) {
        return
    }

    if (findUserCreditCardNumber) {
        alert('Card number already exist');
        return;
    }

    const confirmMsg = "Are you sure to confirm credit card details!";
    if (confirm(confirmMsg) == true) {
        if (event.target.cardHolderName.value && event.target.cardMonthExpiry.value && event.target.cardYearExpiry.value && event.target.cvcNumber.value && event.target.cardNumberInput.value) {
            try {
                const sendData = async () => {
                    userCreditCardDetails = {
                        cardHolderName: event.target.cardHolderName.value,
                        cardNumber: event.target.cardNumberInput.value,
                        monthExpiry: event.target.cardMonthExpiry.value,
                        yearExpiry: event.target.cardYearExpiry.value,
                        cvcNumber: event.target.cvcNumber.value,
                    }
                    const res = fetch('http://localhost:3000/credit-card-details', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userCreditCardDetails)
                    })
                        (await res).json();
                    form.reset();
                    userCardHolderName.innerHTML = "Card holder name";
                    cardMonth.innerHTML = "00";
                    cardYear.innerHTML = "00";
                    cardCVCnumber.innerHTML = "000";
                    userCardNumber.innerHTML = "0000 0000 0000 0000";
                    userCardName.innerHTML = "";
                }
                sendData();
            } catch (error) {
                console.error(error);
            }
        };
    }
}





















// const cardYearExpiryInputError = (err, color, event, flage) => {
//     if (event.type === "input") {
//         event.target.parentElement.parentElement.lastElementChild.innerHTML = err
//         event.target.style.borderColor = color;
//     }
//     else if (event.type = 'text') {
//         // console.log(event);
//         // event.parentElement.parentElement.lastElementChild.innerHTML = err
//         // event.style.borderColor = color;

//         event.target.cardMonthExpiry.parentElement.parentElement.lastElementChild.innerHTML = err
//         event.target.cardMonthExpiry.style.borderColor = color
//         event.target.cardYearExpiry.style.borderColor = color
//     }
//     else {
//         event.target.cardMonthExpiry.parentElement.parentElement.lastElementChild.innerHTML = err;
//         event.target.cardYearExpiry.style.borderColor = color;
//         flageManage(flage);
//     }
// }

// **************************

// if (e.target.id === "cardYearExpiry") {
//     value = value.replace(/[^0-9]/g, '');
//     value = value.length > 2 ? value.slice(0, 2) : value;
//     e.target.value = value;
//     if (!value) {
//         cardYearExpiryInputError("Can't be blank", "red", e);
//     } else if (!monthYearRegex.test(value)) {
//         cardYearExpiryInputError("Numbers only", "red", e);
//     } else if (parseInt(value) < parseInt(dateFull.getFullYear().toString().substr(-2))) {
//         cardYearExpiryInputError("Invalid year", "red", e);
//     } else {
//         cardYearExpiryInputError("", "gray", e);
//     }
//     if (parseInt(value) === parseInt(dateFull.getFullYear().toString().substr(-2))) {
//         if (monthValue < dateFull.getMonth() + 1) {
//             // cardYearExpiryInputError("Invalid month", "red", e.target.previousElementSibling);
//             cardYearExpiryInputError("Invalid month", "red", e);
//         } else if (monthValue > 12) {
//             // cardYearExpiryInputError("Invalid month", "red", e.target.previousElementSibling);
//             cardYearExpiryInputError("Invalid month", "red", e);
//         } else {
//             // cardYearExpiryInputError("", "gray", e.target.previousElementSibling);
//             cardYearExpiryInputError("", "gray", e);
//         }
//     }
//     cardYear.innerHTML = value ? (value.padStart(2, '0')) : "00";
// }

// **************************

// if (event.target.cardYearExpiry) {
//     if (!event.target.cardYearExpiry.value) {
//         cardYearExpiryInputError("Can't be blank", "red", event, true);
//     } else if (!monthYearRegex.test(event.target.cardYearExpiry.value)) {
//         cardYearExpiryInputError("Numbers only", "red", event, true);
//     } else if (parseInt(event.target.cardYearExpiry.value) < parseInt(dateFull.getFullYear().toString().substr(-2))) {
//         cardYearExpiryInputError("Invalid year", "red", event, true);
//     } else {
//         cardYearExpiryInputError("", "gray", event);
//     }
//     if (parseInt(event.target.cardYearExpiry.value) === parseInt(dateFull.getFullYear().toString().substr(-2))) {
//         if (monthValue < dateFull.getMonth() + 1) {
//             // cardYearExpiryInputError("Invalid month", "red", event);
//             cardMonthExpiryInputError("Invalid month", "red", event, true);

//         } else if (monthValue > 12) {
//             // cardYearExpiryInputError("Invalid month", "red", event);
//             cardMonthExpiryInputError("Invalid month", "red", event, true);

//         } else {
//             // cardYearExpiryInputError("", "gray", event);
//             cardMonthExpiryInputError("", "gray", event);
//         }
//     }
// }