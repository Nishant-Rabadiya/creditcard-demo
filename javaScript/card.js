const cardHolder = document.getElementById('cardHolder');
const cardNumber = document.getElementById('cardNumber');
const dateExpiry = document.getElementById('dateExpiry');
const cvcCardNumber = document.getElementById('cvcCardNumber');
const userCard = document.getElementById('userCard');
const userCardCvc = document.getElementById('userCardCvc');

let creditCardData;
const getCreditCardData = async () => {
    const res = await fetch('http://localhost:3000/credit-card-details');
    creditCardData = await res.json();
}
getCreditCardData();
// Start Input validation
// Start card holder name section
const cardHolderNameValue = cardHolder.firstElementChild.nextElementSibling;
const cardHolderNameError = cardHolder.lastElementChild;
const userCardHolderName = userCard.lastElementChild.firstElementChild;
cardHolder.firstElementChild.nextElementSibling.addEventListener("input", () => {

    if (!cardHolderNameValue.value.trim()) {
        cardHolderNameError.innerHTML = "Cardholder name required!"
        cardHolderNameValue.style.borderColor = "red";
    } else if (cardHolderNameValue.value.length < 8) {
        cardHolderNameError.innerHTML = "Cardholder name length must be atleast 8 characters";
        cardHolderNameValue.style.borderColor = "red";
    } else if (cardHolderNameValue.value.length > 30) {
        cardHolderNameError.innerHTML = "Cardholder name length must not exceed 30 characters";
        cardHolderNameValue.style.borderColor = "red";
    } else {
        cardHolderNameError.innerHTML = "";
        cardHolderNameValue.style.borderColor = "gray";
    }
    cardHolderNameValue.value ? userCardHolderName.innerHTML = cardHolderNameValue.value : userCardHolderName.innerHTML = "Card holder name";
});
// End card holder name section
// Start card month expiry section
const dateFull = new Date();
const regex = /^[0-9]{1,2}$/;
const monthDate = dateExpiry.firstElementChild.nextElementSibling.firstElementChild;
const monthError = dateExpiry.lastElementChild;
const cardMonth = userCard.lastElementChild.lastElementChild.firstChild;
dateExpiry.firstElementChild.nextElementSibling.firstElementChild.addEventListener("input", (event) => {
    const value = monthDate.value;
    monthDate.value = value.replace(/[^0-9]/g, '');
    if (monthDate.value.length > 2) {
        monthDate.value = monthDate.value.slice(0, 2);
    }

    if (!monthDate.value) {
        monthError.innerHTML = "Can't be blank";
        monthDate.style.borderColor = "red";
        isFlage = true;
    } else if (parseInt(monthDate.value) <= 0) {
        monthError.innerHTML = "Invalid month";
        monthDate.style.borderColor = "red";
        isFlage = true;
    } else if (parseInt(monthDate.value) > 12) {
        monthError.innerHTML = "Invalid month";
        monthDate.style.borderColor = "red";
        isFlage = true;
    } else if (!regex.test(monthDate.value)) {
        monthError.innerHTML = "Numbers only";
        monthDate.style.borderColor = "red";
        isFlage = true;
    } else {
        monthError.innerHTML = "";
        monthDate.style.borderColor = "gray";
    }

    cardMonth.innerHTML = monthDate.value ? (monthDate.value.padStart(2, '0')) : "00";
});
// End card month expiry section
// Start card year expiry section
const yearDate = dateExpiry.firstElementChild.nextElementSibling.lastElementChild;
const yearError = dateExpiry.lastElementChild;
const cardYear = userCard.lastElementChild.lastElementChild.lastChild;
dateExpiry.firstElementChild.nextElementSibling.lastElementChild.addEventListener('input', () => {
    const value = yearDate.value;
    yearDate.value = value.replace(/[^0-9]/g, '');
    if (yearDate.value.length > 2) {
        yearDate.value = yearDate.value.slice(0, 2);
    }

    if (!yearDate.value) {
        yearError.innerHTML = "Can't be blank";
        yearDate.style.borderColor = "red";
    } else if (!regex.test(yearDate.value)) {
        yearError.innerHTML = "Numbers only";
        yearDate.style.borderColor = "red";
    } else if (parseInt(yearDate.value) < parseInt(dateFull.getFullYear().toString().substr(-2))) {
        yearError.innerHTML = "Invalid year";
        yearDate.style.borderColor = "red";
    } else {
        yearError.innerHTML = "";
        yearDate.style.borderColor = "gray";
    }

    if (parseInt(yearDate.value) === parseInt(dateFull.getFullYear().toString().substr(-2))) {
        if (monthDate.value < dateFull.getMonth() + 1) {
            yearError.innerHTML = "Invalid month";
            monthDate.style.borderColor = "red";
            yearDate.style.borderColor = "gray";
        } else if (monthDate.value > 12) {
            yearError.innerHTML = "Invalid month";
            monthDate.style.borderColor = "red";
            isFlage = true;
        } else {
            yearError.innerHTML = "";
            monthDate.style.borderColor = "gray";
        }
    }
    cardYear.innerHTML = yearDate.value ? (yearDate.value.padStart(2, '0')) : "00";
});
// End card year expiry section
// Start card CVC number section
const cvcNumber = cvcCardNumber.firstElementChild.nextElementSibling;
const cvcError = cvcCardNumber.lastElementChild;
const cardCVCnumber = userCardCvc.firstElementChild.nextElementSibling.firstElementChild;
const cvcRegex = /^[0-9]{1,4}$/;
cvcCardNumber.firstElementChild.nextElementSibling.addEventListener("input", () => {
    const value = cvcNumber.value;
    cvcNumber.value = value.replace(/[^0-9]/g, '');
    if (cvcNumber.value.length > 4) {
        cvcNumber.value = cvcNumber.value.slice(0, 4);
    }

    if (!cvcNumber.value) {
        cvcError.innerHTML = "Can't be blank";
        cvcNumber.style.borderColor = "red";
    } else if (!cvcRegex.test(cvcNumber.value)) {
        cvcError.innerHTML = "Numbers only";
        cvcNumber.style.borderColor = "red";
    } else if (cvcNumber.value.length < 3) {
        cvcError.innerHTML = "length must be atleast 3 number";
        cvcNumber.style.borderColor = "red";
    } else {
        cvcError.innerHTML = "";
        cvcNumber.style.borderColor = "gray";
    }
    cvcNumber.value ? cardCVCnumber.innerHTML = cvcNumber.value : cardCVCnumber.innerHTML = "000";
});
// End card CVC number section
// Start card number section
const cardNumberInput = cardNumber.firstElementChild.nextElementSibling;
cardNumberInput.oninput = () => {
    const input = cardNumberInput;
    let value = input.value.replace(/\s+/g, '').replace(/\D/g, '');
    if (value.length > 20) {
        value = value.slice(0, 20);
    }
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    const cursorPosition = input.selectionStart;
    const spaceCountBefore = (input.value.slice(0, cursorPosition).match(/\s/g) || []).length;
    input.value = formattedValue;
    const spaceCountAfter = (input.value.slice(0, cursorPosition).match(/\s/g) || []).length;
    const newCursorPosition = cursorPosition + (spaceCountAfter - spaceCountBefore);
    input.setSelectionRange(newCursorPosition, newCursorPosition);
};

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
const userCardName = userCard.firstElementChild.lastElementChild;
const cardnumber = (inputtxt) => {
    if (american.test(inputtxt)) {
        userCardName.innerHTML = "American Express";
        return true;
    } else if (visa.test(inputtxt)) {
        userCardName.innerHTML = "Visa";
        return true;
    } else if (mastercard.test(inputtxt)) {
        userCardName.innerHTML = "MasterCard";
        return true;
    } else if (discover.test(inputtxt)) {
        userCardName.innerHTML = "Discover";
        return true;
    } else if (dinersClub.test(inputtxt)) {
        userCardName.innerHTML = "Diners Club";
        return true;
    } else if (JCB.test(inputtxt)) {
        userCardName.innerHTML = "JCB";
        return true;
    } else if (switchCardPattern.test(inputtxt)) {
        userCardName.innerHTML = "Switch";
        return true;
    } else if (laserCard.test(inputtxt)) {
        userCardName.innerHTML = "Laser";
        return true;
    } else if (unionCard.test(inputtxt)) {
        userCardName.innerHTML = "Union";
        return true;
    } else if (instaPaymentCard.test(inputtxt)) {
        userCardName.innerHTML = "Insta Payment";
        return true;
    } else {
        userCardName.innerHTML = "";
        if (!(american.test(inputtxt) || visa.test(inputtxt) || mastercard.test(inputtxt) || discover.test(inputtxt) || dinersClub.test(inputtxt) || JCB.test(inputtxt) || switchCardPattern.test(inputtxt) || laserCard.test(inputtxt) || unionCard.test(inputtxt) || instaPaymentCard.test(inputtxt))) {
            cardInputError.innerHTML = "Please provide a valid card number!";
            creditCardNumber.style.borderColor = "red";
            return;
        } else {
            cardInputError.innerHTML = "";
            creditCardNumber.style.borderColor = "gray";
        }
        return false;
    }
}

const creditCardNumber = cardNumber.firstElementChild.nextElementSibling;
const cardInputError = cardNumber.lastElementChild
const userCardNumber = userCard.firstElementChild.nextElementSibling;
const cardRegex = /^[0-9\s]*$/;
let cardNumberValue;
cardNumber.firstElementChild.nextElementSibling.addEventListener("input", () => {
    const creditCardNumberValue = creditCardNumber.value.trim();
    if (!creditCardNumberValue) {
        cardInputError.innerHTML = "Card number is required!";
        creditCardNumber.style.borderColor = "red";
    } else if (!cardRegex.test(creditCardNumberValue)) {
        cardInputError.innerHTML = "Wrong format, numbers only";
        creditCardNumber.style.borderColor = "red";
    } else if (creditCardNumberValue.length < 8) {
        cardInputError.innerHTML = "Card number length must be at least 8 numbers";
        creditCardNumber.style.borderColor = "red";
    } else if (!(creditCardNumberValue.length === 16 || creditCardNumberValue.length === 17 || creditCardNumberValue.length === 18 || creditCardNumberValue.length === 19)) {
        cardInputError.innerHTML = "Invalid number";
        cardNumberInput.style.borderColor = "red";
    } else {
        cardInputError.innerHTML = "";
        creditCardNumber.style.borderColor = "gray";
    }

    creditCardNumberValue ? userCardNumber.innerHTML = creditCardNumberValue.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ') : userCardNumber.innerHTML = "0000 0000 0000 0000";

    cardNumberValue = creditCardNumberValue.replace(/ /g, '');

    (creditCardNumberValue.length === 16 || creditCardNumberValue.length === 17 || creditCardNumberValue.length === 18 || creditCardNumberValue.length === 19) ? cardnumber(creditCardNumberValue.replace(/ /g, '')) : "";
})
// End card number section
// End Input validation
// Start confirm btn validation
const confirmDetails = (event) => {
    event.preventDefault()
    let isFlage = false;
    // Start card holder name section
    if (!cardHolderNameValue.value.trim()) {
        cardHolderNameError.innerHTML = "Cardholder name required!"
        cardHolderNameValue.style.borderColor = "red";
        isFlage = true;
    } else if (cardHolderNameValue.value.length < 8) {
        cardHolderNameError.innerHTML = "Cardholder name length must be atleast 8 characters";
        cardHolderNameValue.style.borderColor = "red";
        isFlage = true;
    } else if (cardHolderNameValue.value.length > 30) {
        cardHolderNameError.innerHTML = "Cardholder name length must not exceed 30 characters";
        cardHolderNameValue.style.borderColor = "red";
        isFlage = true;
    } else {
        cardHolderNameError.innerHTML = "";
        cardHolderNameValue.style.borderColor = "gray";
    }
    // End card holder name section
    // Start card month expiry section
    const monthValue = monthDate.value;
    monthDate.value = monthValue.replace(/[^0-9]/g, '');
    if (monthDate.value.length > 2) {
        monthDate.value = monthDate.value.slice(0, 2);
    }

    if (!monthDate.value) {
        monthError.innerHTML = "Can't be blank";
        monthDate.style.borderColor = "red";
        isFlage = true;
    } else if (parseInt(monthDate.value) <= 0) {
        monthError.innerHTML = "Invalid month";
        monthDate.style.borderColor = "red";
        isFlage = true;
    } else if (parseInt(monthDate.value) > 12) {
        monthError.innerHTML = "Invalid month";
        monthDate.style.borderColor = "red";
        isFlage = true;
    } else if (!regex.test(monthDate.value)) {
        monthError.innerHTML = "Numbers only";
        monthDate.style.borderColor = "red";
        isFlage = true;
    } else {
        monthError.innerHTML = "";
        monthDate.style.borderColor = "gray";
    }
    // End card month expiry section
    // Start card year expiry section
    const yearValue = yearDate.value;
    yearDate.value = yearValue.replace(/[^0-9]/g, '');
    if (yearDate.value.length > 2) {
        yearDate.value = yearDate.value.slice(0, 2);
    }

    if (!yearDate.value) {
        yearError.innerHTML = "Can't be blank";
        yearDate.style.borderColor = "red";
        isFlage = true;
    } else if (!regex.test(yearDate.value)) {
        yearError.innerHTML = "Numbers only";
        yearDate.style.borderColor = "red";
        isFlage = true;
    } else if (parseInt(yearDate.value) < parseInt(dateFull.getFullYear().toString().substr(-2))) {
        yearError.innerHTML = "Invalid year";
        yearDate.style.borderColor = "red";
        isFlage = true;
    } else {
        yearError.innerHTML = "";
        yearDate.style.borderColor = "gray";
    }

    if (parseInt(yearDate.value) === parseInt(dateFull.getFullYear().toString().substr(-2))) {
        if (monthDate.value < dateFull.getMonth() + 1) {
            yearError.innerHTML = "Invalid month";
            monthDate.style.borderColor = "red";
            isFlage = true;
        } else if (monthDate.value > 12) {
            yearError.innerHTML = "Invalid month";
            monthDate.style.borderColor = "red";
            isFlage = true;
        } else {
            yearError.innerHTML = "";
            monthDate.style.borderColor = "gray";
        }
    }
    // End card year expiry section
    // Start card CVC number section
    const cvcValue = cvcNumber.value;
    cvcNumber.value = cvcValue.replace(/[^0-9]/g, '');
    if (cvcNumber.value.length > 4) {
        cvcNumber.value = cvcNumber.value.slice(0, 4);
    }

    if (!cvcNumber.value) {
        cvcError.innerHTML = "Can't be blank";
        cvcNumber.style.borderColor = "red";
        isFlage = true;
    } else if (!cvcRegex.test(cvcNumber.value)) {
        cvcError.innerHTML = "Numbers only";
        cvcNumber.style.borderColor = "red";
        isFlage = true;
    } else if (cvcNumber.value.length < 3) {
        cvcError.innerHTML = "length must be atleast 3 number";
        cvcNumber.style.borderColor = "red";
        isFlage = true;
    } else {
        cvcError.innerHTML = "";
        cvcNumber.style.borderColor = "gray";
    }
    // End card CVC number section
    // Start card number section
    const findUserCreditCardNumber = creditCardData.find((item) => {
        return item.cardNumber === creditCardNumber.value.trim();
    });

    const creditCardNumberValue = creditCardNumber.value.trim();
    if (!creditCardNumberValue) {
        cardInputError.innerHTML = "Card number is required!";
        creditCardNumber.style.borderColor = "red";
        isFlage = true;
    } else if (!cardRegex.test(creditCardNumberValue)) {
        cardInputError.innerHTML = "Wrong format, numbers only";
        creditCardNumber.style.borderColor = "red";
        isFlage = true;
    } else if (creditCardNumberValue.length < 8) {
        cardInputError.innerHTML = "Card number length must be at least 8 numbers";
        creditCardNumber.style.borderColor = "red";
        isFlage = true;
    } else if (!(creditCardNumberValue.length === 16 || creditCardNumberValue.length === 17 || creditCardNumberValue.length === 18 || creditCardNumberValue.length === 19)) {
        cardInputError.innerHTML = "Invalid number";
        cardNumberInput.style.borderColor = "red";
        isFlage = true;
    } else if (!(american.test(cardNumberValue) || visa.test(cardNumberValue) || mastercard.test(cardNumberValue) || discover.test(cardNumberValue) || dinersClub.test(cardNumberValue) || JCB.test(cardNumberValue) || switchCardPattern.test(cardNumberValue) || laserCard.test(cardNumberValue) || unionCard.test(cardNumberValue) || instaPaymentCard.test(cardNumberValue))) {
        cardInputError.innerHTML = "Please provide a valid card number!";
        cardNumberInput.style.borderColor = "red";
        isFlage = true;
    } else {
        cardInputError.innerHTML = "";
        creditCardNumber.style.borderColor = "gray";
    }
    (creditCardNumberValue.length === 16 || creditCardNumberValue.length === 17 || creditCardNumberValue.length === 18 || creditCardNumberValue.length === 19) ? cardnumber(creditCardNumberValue.replace(/ /g, '')) : "";
    // End card number section

    if (isFlage) {
        return;
    }

    if (findUserCreditCardNumber) {
        alert('Card number already exist');
        return;
    }

    const confirmMsg = "Are you sure to confirm credit card details!";
    if (confirm(confirmMsg) == true) {
        if (cardHolderNameValue.value && monthDate.value && yearDate.value && cvcNumber.value && cardNumberInput.value) {
            try {
                const sendData = async () => {
                    userCreditCardDetails = {
                        cardHolderName: cardHolderNameValue.value,
                        cardNumber: cardNumberInput.value,
                        monthExpiry: monthDate.value,
                        yearExpiry: yearDate.value,
                        cvcNumber: cvcNumber.value,
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
// End confirm btn validation