const cardHolderName = document.getElementById('cardHolderName');
const cardHolderNameError = document.getElementById('cardHolderNameError');
const userCardHolderName = document.getElementById('userCardHolderName');
const confirmCardDetails = document.getElementById('confirmCardDetails');
const cardMonthExpiry = document.getElementById('cardMonthExpiry');
const cardYearExpiry = document.getElementById('cardYearExpiry');
const cardExpiryError = document.getElementById('cardExpiryError');
const cardMonth = document.getElementById('cardMonth');
const cardYear = document.getElementById('cardYear');
const cvcNumber = document.getElementById('cvcNumber');
const cvcError = document.getElementById('cvcError');
const cardCVCnumber = document.getElementById('cardCVCnumber');
const cardNumberInput = document.getElementById('cardNumberInput');
const cardInputError = document.getElementById('cardInputError');
const userCardNumber = document.getElementById('userCardNumber');
const userCardName = document.getElementById('userCardName');
const form = document.getElementById('form');

let creditCardData;
const getCreditCardData = async () => {
    const res = await fetch('http://localhost:3000/credit-card-details');
    creditCardData = await res.json();
}
getCreditCardData();

cardHolderName.addEventListener('input', () => {
    if (!cardHolderName.value.trim()) {
        cardHolderNameError.innerHTML = "Cardholder name required!"
        cardHolderName.style.borderColor = "red";
    } else if (cardHolderName.value.length < 8) {
        cardHolderNameError.innerHTML = "Cardholder name length must be atleast 8 characters";
        cardHolderName.style.borderColor = "red";
    } else if (cardHolderName.value.length > 30) {
        cardHolderNameError.innerHTML = "Cardholder name length must not exceed 30 characters";
        cardHolderName.style.borderColor = "red";
    } else {
        cardHolderNameError.innerHTML = "";
        cardHolderName.style.borderColor = "gray";
    }
    cardHolderName.value ? userCardHolderName.innerHTML = cardHolderName.value : userCardHolderName.innerHTML = "Card holder name";
});

const dateFull = new Date();
const regex = /^[0-9]+$/;
cardMonthExpiry.addEventListener('input', () => {
    if (!cardMonthExpiry.value) {
        cardExpiryError.innerHTML = "Can't be blank";
        cardMonthExpiry.style.borderColor = "red";
    } else if (cardMonthExpiry.value <= 0) {
        cardExpiryError.innerHTML = "Invalid month";
        cardMonthExpiry.style.borderColor = "red";
    } else if (cardMonthExpiry.value > 12) {
        cardExpiryError.innerHTML = "Invalid month";
        cardMonthExpiry.style.borderColor = "red";
    } else if (!regex.test(cardMonthExpiry.value)) {
        cardExpiryError.innerHTML = "Numbers only";
        cardMonthExpiry.style.borderColor = "red";
    } else {
        cardExpiryError.innerHTML = "";
        cardMonthExpiry.style.borderColor = "gray";
    }
    cardMonthExpiry.value ? cardMonth.innerHTML = ((cardMonthExpiry.value <= 9) ? ("0" + cardMonthExpiry.value) : cardMonthExpiry.value) : cardMonth.innerHTML = "00";
});

cardYearExpiry.addEventListener('input', () => {
    if (!cardYearExpiry.value) {
        cardExpiryError.innerHTML = "Can't be blank";
        cardYearExpiry.style.borderColor = "red";
    } else if (!regex.test(cardYearExpiry.value)) {
        cardExpiryError.innerHTML = "Numbers only";
        cardYearExpiry.style.borderColor = "red";
    } else if (cardYearExpiry.value < dateFull.getFullYear().toString().substr(-2)) {
        cardExpiryError.innerHTML = "Invalid year";
        cardYearExpiry.style.borderColor = "red";
    } else {
        cardExpiryError.innerHTML = "";
        cardYearExpiry.style.borderColor = "gray";
    }
    cardYearExpiry.value ? cardYear.innerHTML = ((cardYearExpiry.value <= 9) ? ("0" + cardYearExpiry.value) : cardYearExpiry.value) : cardYear.innerHTML = "00";
});

cvcNumber.addEventListener('input', () => {
    if (!cvcNumber.value) {
        cvcError.innerHTML = "Can't be blank";
        cvcNumber.style.borderColor = "red";
    } else if (!regex.test(cvcNumber.value)) {
        cvcError.innerHTML = "Numbers only";
        cvcNumber.style.borderColor = "red";
    } else if (cvcNumber.value.length < 3) {
        cvcError.innerHTML = "length must be atleast 3 number";
        cvcNumber.style.borderColor = "red";
    } else if (cvcNumber.value.length > 4) {
        cvcError.innerHTML = "length must not exceed 4 number";
        cvcNumber.style.borderColor = "red";
    } else {
        cvcError.innerHTML = "";
        cvcNumber.style.borderColor = "gray";
    }
    cvcNumber.value ? cardCVCnumber.innerHTML = cvcNumber.value : cardCVCnumber.innerHTML = "000";
});

cardNumberInput.oninput = () => {
    const value = cardNumberInput.value.replace(/\s+/g, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 == 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    cardNumberInput.value = formattedValue;
}

const american = /^(?:3[47][0-9]{13})$/; // 15 numbers required
const visa = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/; // 16 numbers required
const mastercard = /^(?:5[1-5][0-9]{14})$/; // 16 numbers required
const discover = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/; // 15 numbers required
const dinersClub = /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/; // 14 numbers required
const JCB = /^(?:(?:2131|1800|35\d{3})\d{11})$/; // 15 or 16 numbers required
const switchCardPattern = /^(4903|4905|4911|4936|6333|6759|564182|633110)\d{10,15}$/; // 15 or 16 numbers required
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
    } else {
        userCardName.innerHTML = "";
        if (!(american.test(inputtxt) || visa.test(inputtxt) || mastercard.test(inputtxt) || discover.test(inputtxt) || dinersClub.test(inputtxt) || JCB.test(inputtxt) || switchCardPattern.test(inputtxt))) {
            cardInputError.innerHTML = "Invalid number";
            return;
        } else {
            cardInputError.innerHTML = "";
        }
        return false;
    }
}

let cardNumberValue;
cardNumberInput.addEventListener('input', () => {
    const regex = /^[0-9\s]*$/;
    const cardNumber = cardNumberInput.value.trim();

    if (!cardNumber) {
        cardInputError.innerHTML = "Card number is required!";
        cardNumberInput.style.borderColor = "red";
    } else if (!regex.test(cardNumber)) {
        cardInputError.innerHTML = "Wrong format, numbers only";
        cardNumberInput.style.borderColor = "red";
    } else if (cardNumber.length < 8) {
        cardInputError.innerHTML = "Card number length must be at least 8 numbers";
        cardNumberInput.style.borderColor = "red";
    } else {
        cardInputError.innerHTML = "";
        cardNumberInput.style.borderColor = "gray";
    }

    cardNumber ? userCardNumber.innerHTML = cardNumber.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ') : userCardNumber.innerHTML = "0000 0000 0000 0000";
    
    cardNumberValue = cardNumber.replace(/ /g, '');

    (cardNumber.length === 18 || cardNumber.length === 19 || cardNumber.length === 17) ? cardnumber(cardNumber.replace(/ /g, '')) : "";
});

confirmCardDetails.addEventListener('click', (e) => {
    e.preventDefault();
    let isFlage = false;

    if (!cardHolderName.value.trim()) {
        cardHolderNameError.innerHTML = "Cardholder name required!";
        cardHolderName.style.borderColor = "red";
        isFlage = true;
    } else if (cardHolderName.value.length < 8) {
        cardHolderNameError.innerHTML = "Cardholder name length must be atleast 8 characters";
        cardHolderName.style.borderColor = "red";
        isFlage = true;
    } else if (cardHolderName.value.length > 30) {
        cardHolderNameError.innerHTML = "Cardholder name length must not exceed 30 characters";
        cardHolderName.style.borderColor = "red";
        isFlage = true;
    } else {
        cardHolderNameError.innerHTML = "";
        cardHolderName.style.borderColor = "gray";
    }

    const regex = /^[0-9]+$/;
    if (!cardMonthExpiry.value) {
        cardExpiryError.innerHTML = "Can't be blank";
        cardMonthExpiry.style.borderColor = "red";
        isFlage = true;
    } else if (cardMonthExpiry.value <= 0) {
        cardExpiryError.innerHTML = "Invalid month";
        cardMonthExpiry.style.borderColor = "red";
        isFlage = true;
    } else if (cardMonthExpiry.value > 12) {
        cardExpiryError.innerHTML = "Invalid month";
        cardMonthExpiry.style.borderColor = "red";
        isFlage = true;
    } else if (!regex.test(cardMonthExpiry.value)) {
        cardExpiryError.innerHTML = "Numbers only";
        cardMonthExpiry.style.borderColor = "red";
        isFlage = true;
    } else {
        cardExpiryError.innerHTML = "";
        cardMonthExpiry.style.borderColor = "gray";
    }

    if (!cardYearExpiry.value) {
        cardExpiryError.innerHTML = "Can't be blank";
        cardYearExpiry.style.borderColor = "red";
        isFlage = true;
    } else if (!regex.test(cardYearExpiry.value)) {
        cardExpiryError.innerHTML = "Numbers only";
        cardYearExpiry.style.borderColor = "red";
        isFlage = true;
    } else if (cardYearExpiry.value < dateFull.getFullYear().toString().substr(-2)) {
        cardExpiryError.innerHTML = "Invalid year";
        cardYearExpiry.style.borderColor = "red";
        isFlage = true;
    } else if (cardYearExpiry.value === dateFull.getFullYear().toString().substr(-2)) {
        if (cardMonthExpiry.value < dateFull.getMonth() + 1) {
            cardExpiryError.innerHTML = "Invalid month";
            cardMonthExpiry.style.borderColor = "red";
            isFlage = true;
        }
        else {
            cardExpiryError.innerHTML = "";
            cardMonthExpiry.style.borderColor = "gray";
        }
    } else {
        cardExpiryError.innerHTML = "";
        cardYearExpiry.style.borderColor = "gray";
    }

    if (cardYearExpiry.value === dateFull.getFullYear().toString().substr(-2)) {
        if (cardMonthExpiry.value < dateFull.getMonth() + 1) {
            cardExpiryError.innerHTML = "Invalid month";
            cardMonthExpiry.style.borderColor = "red";
            isFlage = true;
        }
        else {
            cardExpiryError.innerHTML = "";
            cardMonthExpiry.style.borderColor = "gray";
        }
    }

    if (!cvcNumber.value) {
        cvcError.innerHTML = "Can't be blank";
        cvcNumber.style.borderColor = "red";
        isFlage = true;
    } else if (!regex.test(cvcNumber.value)) {
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

    const findUserCreditCardNumber = creditCardData.find((item) => {
        return item.cardNumber === cardNumberInput.value;
    })

    const regexCard = /^[0-9\s]*$/;
    const cardNumber = cardNumberInput.value.trim();
    if (!cardNumber) {
        cardInputError.innerHTML = "Card number is required!";
        cardNumberInput.style.borderColor = "red";
        isFlage = true;
    } else if (!regexCard.test(cardNumber)) {
        cardInputError.innerHTML = "Wrong format, numbers only";
        cardNumberInput.style.borderColor = "red";
        isFlage = true;
    } else if (cardNumber.length < 8) {
        cardInputError.innerHTML = "Card number length must be at least 8 numbers";
        cardNumberInput.style.borderColor = "red";
        isFlage = true;
    } else if (!(cardNumber.length === 17 || cardNumber.length === 18 || cardNumber.length === 19)) {
        cardInputError.innerHTML = "Invalid number";
        cardNumberInput.style.borderColor = "red";
        isFlage = true;
    } else if (!(american.test(cardNumberValue) || visa.test(cardNumberValue) || mastercard.test(cardNumberValue) || discover.test(cardNumberValue) || dinersClub.test(cardNumberValue) || JCB.test(cardNumberValue) || switchCardPattern.test(cardNumberValue))) {
        cardInputError.innerHTML = "Please provide a valid card number!";
        cardNumberInput.style.borderColor = "red";
        isFlage = true;
    } else {
        cardInputError.innerHTML = "";
        cardNumberInput.style.borderColor = "gray";
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
        if (cardHolderName.value && cardMonthExpiry.value && cardYearExpiry.value && cvcNumber.value && cardNumberInput.value) {
            try {
                const sendData = async () => {
                    userCreditCardDetails = {
                        cardHolderName: cardHolderName.value,
                        cardNumber: cardNumberInput.value,
                        monthExpiry: cardMonthExpiry.value,
                        yearExpiry: cardYearExpiry.value,
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
})






 // if (!monthDate.value) {
    //     monthError.innerHTML = "Can't be blank";
    //     monthDate.style.borderColor = "red";
    //     isFlage = true;
    // } else if (parseInt(monthDate.value) <= 0) {
    //     monthError.innerHTML = "Invalid month";
    //     monthDate.style.borderColor = "red";
    //     isFlage = true;
    // } else if (parseInt(monthDate.value) >= 12) {
    //     monthError.innerHTML = "Invalid month";
    //     monthDate.style.borderColor = "red";
    //     isFlage = true;
    // } else if (!regex.test(monthDate.value)) {
    //     monthError.innerHTML = "Numbers only";
    //     monthDate.style.borderColor = "red";
    //     isFlage = true;
    // } else {
    //     monthError.innerHTML = "";
    //     monthDate.style.borderColor = "gray";
    // }