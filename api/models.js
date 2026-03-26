/**
 * Data shape for a User.
 * @param email A valid email address string
 * @param name A first and last name string
 * @param phone A valid phone number string
 * @param age A positive integer age
 * @param address An address string
 */
class User {
    email;
    name;
    phone;
    age;
    address;

    constructor(name, email, phone, age, address) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.age = age;
        this.address = address;
    }
}

/**
 * Data shape for a Conference
 * @param id An integer identifier
 * @param title The title of the conference
 * @param description The description of the conference
 * @param category The category(s) this conference is assigned
 * @param format The presentation format of the conference
 * @param entryPrice The price to attend this conference
 * @param additionalInfo Additional conference info not covered elsewhere
 * @param approved Whether this conference has been approved for display (defaults to false)
 */
class Conference {
    id;
    title;
    description;
    category;
    format;
    entryPrice;
    additionalInfo;
    approved;

    constructor(id, title, description, category, format, entryPrice, additionalInfo, approved = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.format = format;
        this.entryPrice = entryPrice;
        this.additionalInfo = additionalInfo;
        this.approved = approved;
    }
}

/**
 * Data shape for a Product.
 * @param id An integer identifier
 * @param name The product name
 * @param image An image link to the product image
 * @param description A description of the product
 * @param category The category(s) this product is assigned to
 * @param specifictaions A specification string
 * @param price The price of this product
 * @param additionalInfo Additional product info not covered elsewhere
 */
class Product {
    id;
    name;
    image;
    description;
    category;
    specifications;
    price;
    additionalInfo;

    constructor(id, name, image, description, category, specifications, price, additionalInfo) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.category = category;
        this.specifications = specifications;
        this.price = price;
        this.additionalInfo = additionalInfo;
    }
}

/**
 * Data shape for a ConferenceSignup where conferenceId is from a {@link Conference}.
 * @param id An integer identifier
 * @param fullName The full name of the attendee
 * @param email The email of the attendee
 * @param conferenceId The integer identifier of the conference being signed up for
 * @param participationType The participation format: "in-person", "virtual", or "vip"
 * @param notes Additional notes or special requests from the attendee
 */
class ConferenceSignup {
    id;
    fullName;
    email;
    conferenceId;
    participationType;
    notes;

    constructor(id, fullName, email, conferenceId, participationType, notes) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.conferenceId = conferenceId;
        this.participationType = participationType;
        this.notes = notes;
    }
}

module.exports = { User, Conference, Product, ConferenceSignup };