// export const BaseUrl ='https://learnify.website'
// export const TutorBaseUrl ='https://learnify.website/tutor'
// export const UserBaseUrl ='https://learnify.website/student'
// export const AdminBaseUrl ='https://learnify.website/admin'
// export const PaymentBaseUrl = 'https://learnify.website/api/checkout'

// export const BaseUrl ='http://localhost:5000'
// export const TutorBaseUrl ='http://localhost:5000/tutor'
// export const UserBaseUrl ='http://localhost:5000/student'
// export const AdminBaseUrl ='http://localhost:5000/admin'
// export const PaymentBaseUrl = 'http://localhost:5000/api/checkout'      


const isProduction = process.env.NODE_ENV === 'production';

export const BaseUrl = isProduction ? 'https://learnify-4bjt.onrender.com' : 'http://localhost:5000';
export const TutorBaseUrl = `${BaseUrl}/tutor`;
export const UserBaseUrl = `${BaseUrl}/student`;
export const AdminBaseUrl = `${BaseUrl}/admin`;
export const PaymentBaseUrl = `${BaseUrl}/api/checkout`;
