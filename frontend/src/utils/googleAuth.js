// export const initializeGoogleAuth = (onSuccess) => {
//   // Load Google API script
//   const script = document.createElement('script')
//   script.src = 'https://accounts.google.com/gsi/client'
//   script.async = true
//   script.defer = true
//   document.head.appendChild(script)

//   script.onload = () => {
//     window.google.accounts.id.initialize({
//       client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual client ID
//       callback: onSuccess,
//     })
//   }
// }

// export const renderGoogleButton = (elementId) => {
//   if (window.google) {
//     window.google.accounts.id.renderButton(
//       document.getElementById(elementId),
//       { theme: 'outline', size: 'large', width: '100%' }
//     )
//   }
// }