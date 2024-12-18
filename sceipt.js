// LocalStorage'dan veriyi çekme ve görüntüleme
function loadData() {
    let wasteData = JSON.parse(localStorage.getItem('wasteData')) || [];
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = ''; // Önceki veriyi temizle

    wasteData.forEach(data => {
        const wasteEntry = document.createElement('div');
        wasteEntry.classList.add('wasteEntry');
        wasteEntry.innerHTML = `
            <p>Öğrenci: ${data.studentName}</p>
            <p>Okul: ${data.school}</p>
            <p>Atık Türü: ${data.wasteType}</p>
            <p>Atık Miktarı: ${data.wasteKg} kg</p>
            <p>Ayrıştırıldı mı: ${data.wasteSorted ? 'Evet' : 'Hayır'}</p>
            <hr>
        `;
        dataContainer.appendChild(wasteEntry);
    });
}

// Atık kaydetme fonksiyonu
function addWaste(wasteType, wasteKg, wasteSorted, studentName, schoolName) {
    const wasteData = JSON.parse(localStorage.getItem('wasteData')) || [];
    const wasteEntry = {
        studentName: studentName,
        school: schoolName,
        wasteType: wasteType,
        wasteKg: parseFloat(wasteKg),
        wasteSorted: wasteSorted === 'evet'
    };

    wasteData.push(wasteEntry);
    localStorage.setItem('wasteData', JSON.stringify(wasteData));
}

// Öğrenci kaydını ekleme
document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const studentName = document.getElementById('studentName').value;
    const studentMail = document.getElementById('studentMail').value;
    const studentSchool = document.getElementById('studentSchool').value;

    // Öğrenci kaydını localStorage'a kaydet
    localStorage.setItem('studentInfo', JSON.stringify({
        studentName, studentMail, studentSchool
    }));
    alert('Öğrenci kaydınız başarıyla yapıldı.');
});

// Atık formunu işleme
document.getElementById('wasteForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const wasteType = document.getElementById('wasteType').value;
    const wasteKg = document.getElementById('wasteKg').value;
    const wasteSorted = document.getElementById('wasteSorted').value;

    // Öğrenci bilgilerini localStorage'tan al
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo'));
    const studentName = studentInfo ? studentInfo.studentName : 'Bilinmiyor';
    const schoolName = studentInfo ? studentInfo.studentSchool : 'Bilinmiyor';

    // Atık kaydını ekle
    addWaste(wasteType, wasteKg, wasteSorted, studentName, schoolName);
    loadData(); // Veriyi tekrar görüntüle
});
