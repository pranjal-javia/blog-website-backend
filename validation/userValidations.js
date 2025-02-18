import {z} from "zod";

const regex_password = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]/;
export const user_zod_schema = z.object({
    username: z.string().min(3, "Name is required").max(50, "Name must be less than 16 charactors"), // add trim
    email: z.string().min(1, "Email is required").email({message: "Invalid email address"}).max(50, "email must be less than 51 charactors"), 
    password: z.string().min(8, "Password should have atleast 8 charactors").max(15, "Password should have atmost 15 charactors").regex(regex_password, "Password should contain atleast one upper case, one lower case, one special charactor, one digit. Password length sjould be 8 to 15 charector"),
    first_name: z.string().min(1, "First name is required").max(30, "First name must be less than 31 charactors"),
    last_name: z.string().min(1, "Last name is required").max(30, "Last name must be less than 31 charactors"), 
    address: z.string().min(1, "Address is required").max(255, "Address must be less than 255 charactors"),
    city: z.string().min(1, "City name is required").max(255, "City name must be less than 255 charactors"),
    pincode: z.string().min(1, "Zipcode is required").max(10, "Pincode must be less than 11 charactors"),
    state: z.string().min(1, "State name is required").max(255, "State name must be less than 255 charactors"),
    country: z.string().min(1, "Country name is required").max(255, "Country name must be less than 255 charactors"),
    phone_number: z.string().min(1, "Phone number is required").max(20, "Phone number must be less than 20 charactors"),
    profile_url: z.string().min(1, "Profile url is required"),
    dob: z.string().date(),
});

export const email_validation_zod = z.object({
    email: z.string().email({message: "Enter valid email address"})
});

export const update_user_zod_schema = z.object({
    username: z.string().min(3, "Name is required").max(50, "Name must be less than 16 charactors"), // add trim
    email: z.string().min(1, "Email is required").email({message: "Invalid email address"}),
    first_name: z.string().min(1, "First name is required").max(30, "First name must be less than 31 charactors"),
    last_name: z.string().min(1, "Last name is required").max(30, "Last name must be less than 31 charactors"), 
    address: z.string().min(1, "Address is required").max(255, "Address must be less than 255 charactors"),
    city: z.string().min(1, "City name is required").max(255, "City name must be less than 255 charactors"),
    pincode: z.string().min(1, "Zipcode is required").max(10, "Pincode must be less than 11 charactors"),
    state: z.string().min(1, "State name is required").max(255, "State name must be less than 255 charactors"),
    country: z.string().min(1, "Country name is required").max(255, "Country name must be less than 255 charactors"),
    phone_number: z.string().min(1, "Phone number is required").max(20, "Phone number must be less than 20 charactors"),
    profile_url: z.string().min(1, "Profile url is required"),
    dob: z.string().date(),
});

