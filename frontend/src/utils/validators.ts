export function validateRegistration(data:any){

const errors:any={}

/* Username */

if(!data.userName)
errors.userName="Username is required"

else if(data.userName.length<3 || data.userName.length>50)
errors.userName="Username must be 3–50 characters"

else if(!/^[a-zA-Z0-9_]+$/.test(data.userName))
errors.userName="Username can contain only letters numbers and _"

/* Password */

if(!data.password)
errors.password="Password is required"

else if(data.password.length<6)
errors.password="Password must be at least 6 characters"

/* Name */

if(!data.name)
errors.name="Full name required"

else if(data.name.length<2 || data.name.length>100)
errors.name="Name must be between 2 and 100 characters"

/* Preferred Name */

if(!data.preferredName)
errors.preferredName="Preferred name required"

else if(data.preferredName.length<2 || data.preferredName.length>50)
errors.preferredName="Preferred name must be 2–50 characters"

/* Email */

if(!data.email)
errors.email="Email required"

else if(!/^\S+@\S+.\S+$/.test(data.email))
errors.email="Enter valid email"

/* Phone */

if(!data.phone)
errors.phone="Phone number required"

else if(!/^[6-9]\d{9}$/.test(data.phone))
errors.phone="Enter valid Indian phone number"

/* Department */

if(!data.department)
errors.department="Department required"

/* Address */

if(!data.state)
errors.state="State required"

if(!data.district)
errors.district="District required"

if(!data.city)
errors.city="City required"

if(!data.pincode)
errors.pincode="Pincode required"

/* ROLE VALIDATION */

if(!data.role)
errors.role="Select role"

/* STUDENT */

if(data.role==="STUDENT"){

if(!/^[2][0-9]{10}$/.test(data.rollNo))
errors.rollNo="Roll number must be 11 digits starting with 2"

if(!data.course)
errors.course="Course required"

if(!data.currentYear)
errors.currentYear="Current year required"

else if(data.currentYear<1 || data.currentYear>5)
errors.currentYear="Year must be between 1 and 5"

}

/* ALUMNI */

if(data.role==="ALUMNI"){

if(!data.graduationYear)
errors.graduationYear="Graduation year required"

else if(data.graduationYear<2000)
errors.graduationYear="Graduation year must be 2000 or later"

}

/* PROFESSOR */

if(data.role==="PROFESSOR"){

if(!data.designation)
errors.designation="Designation required"

if(!data.qualifications)
errors.qualifications="Qualifications required"

if(!data.specialization)
errors.specialization="Specialization required"

if(!data.experience)
errors.experience="Experience required"

}

return errors

}
