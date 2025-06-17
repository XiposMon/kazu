
// GANTI bagian ini dengan config Firebase milik kamu
const firebaseConfig = {
  apiKey: "AIzaSyBVKy5fZQaqyWnPeUoUufSL9WHT-kkv7vY",
  authDomain: "raideneii.firebaseapp.com",
  projectId: "raideneii",
  storageBucket: "raideneii.firebasestorage.app",
  messagingSenderId: "794294462686",
  appId: "1:794294462686:web:ca5281822ddc1fc256fa4f",
  measurementId: "G-SDTEB4X6XM"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

async function uploadData(dataUrl, lat, lon) {
  const timestamp = Date.now();
  const ref = storage.ref().child("foto/" + timestamp + ".jpg");

  const response = await fetch(dataUrl);
  const blob = await response.blob();

  await ref.put(blob);
  const imageUrl = await ref.getDownloadURL();

  await db.collection("pengunjung").add({
    image: imageUrl,
    latitude: lat,
    longitude: lon,
    timestamp: new Date().toISOString()
  });

  alert("Data berhasil dikirim ✅");
}


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
