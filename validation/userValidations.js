import {z} from "zod";

const regex_password = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]/;
export const user_zod_schema = z.object({
    username: z.string().min(3, "Name is required"), // add trim
    email: z.string().min(1, "Email is required").email({message: "Invalid email address"}), 
    password: z.string().min(8, "Password should have atleast 8 charactors").max(15, "Password should have atmost 15 charactors").regex(regex_password, "Password should contain atleast one upper case, one lower case, one special charactor, one digit. Password length sjould be 8 to 15 charector"),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"), 
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City name is required"),
    pincode: z.string().min(1, "Zipcode is required"),
    state: z.string().min(1, "State name is required"),
    country: z.string().min(1, "Country name is required"),
    phone_number: z.string().min(1, "Phone number is required"),
    profile_url: z.string().min(1, "Profile url is required"),
    dob: z.string().date(),
});

export const email_validation_zod = z.object({
    email: z.string().email({message: "Enter valid email address"})
});

export const update_user_zod_schema = z.object({
    username: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email({message: "Invalid email address"}),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"), 
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City name is required"),
    pincode: z.string().min(1, "Zipcode is required"),
    state: z.string().min(1, "State name is required"),
    country: z.string().min(1, "Country name is required"),
    phone_number: z.string().min(1, "Phone number is required"),
    profile_url: z.string().min(1, "Profile url is required"),
    dob: z.string().date(),
});

