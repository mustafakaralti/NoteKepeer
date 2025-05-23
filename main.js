// ! Ay Dizisi
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  // ! Html'den Js'e elemanların çekilmesi
  const addBox = document.querySelector(".add-box");
  const popupContainer = document.querySelector(".popup-box");
  const popup = document.querySelector(".popup");
  const closeBtn = document.querySelector("#close-btn");
  const form = document.querySelector("form");
  const wrapper = document.querySelector(".wrapper");
  const popupTitle = document.querySelector("header h1");
  const submitBtn = document.querySelector("form button");
  
  // ! localStorage'dan notes key'ine sahip elemanları al.Eğer localStorage boş ise bunu boş bir dizi olarak belirle
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  
  console.log(notes);
  
  // ! Güncelleme işlemi için global değişkenler oluştur
  let isUpdate = false;
  let updateId = null;
  
  // addBox elemanının tıklanma olayını izle
  addBox.addEventListener("click", () => {
    // Popup'ı aktif et --> popupContainer ve popup elemanlarına show class'ı ekle
    popupContainer.classList.add("show");
    popup.classList.add("show");
  
    // Body'nin kaydırılmasını engelle
    document.body.style.overflow = "hidden";
  });
  
  // closeBtn elemanının tıklanma olayını izle
  closeBtn.addEventListener("click", () => {
    // Popup'ı eski haline çevir --> popupContainer ve popup elemanlarından show class'ını kaldır
    popupContainer.classList.remove("show");
    popup.classList.remove("show");
  
    // Body'nin kaydırılmasını aktif et
    document.body.style.overflow = "auto";
  });
  
  // formun gönderilmesini izle
  form.addEventListener("submit", (e) => {
    // Sayfa yenilemesini engelle
    e.preventDefault();
  
    // Form içerisindeki input ve textarea içerisindeki değerlere eriş ve başında sonundaki boşlukları kaldır
    const title = e.target[0].value.trim();
    const description = e.target[1].value.trim();
  
    // Eğer title ve description kısımları boşsa kullanıcıya uyarı ver
    if (!title || !description) {
      alert(`Title ve description kısımları boş bırakılamaz.`);
  
      // Fonksiyonu durdur
      return;
    }
  
    const date = new Date();
    // Uniq id ve tarih verisi oluştur
    const id = date.getTime();
    const day = date.getDate();
    const month = date.getMonth();
    const updateMonth = months[month];
    const year = date.getFullYear();
  
    // Eğerki form güncelleme modundaysa
    if (isUpdate) {
      // Güncelleme yapılacak notu notes dizisi içerisinde bul
      const findIndex = notes.findIndex((note) => note.id == updateId);
  
      // Bulunan elemanı güncelle
      notes[findIndex] = {
        title,
        description,
        id,
        date: `${updateMonth} ${day},${year}`,
      };
      // Popup'ı ve Form'u eski haline getir
      isUpdate = false;
      updateId = null;
  
      popupTitle.textContent = "New Note";
      submitBtn.textContent = "Add Note";
    } else {
      // Tarih verisi oluştur
      let noteItem = {
        title,
        description,
        id,
        date: `${updateMonth} ${day},${year}`,
      };
  
      // Oluşturulan note objesini notes objesine ekle
      notes.push(noteItem);
    }
  
    // Notes dizisini localStorage'a kayıt et
    localStorage.setItem("notes", JSON.stringify(notes));
  
    // Formu temizle
    e.target.reset();
  
    // Popup'ı kapat
    popupContainer.classList.remove("show");
    popup.classList.remove("show");
  
    // Notları render et
    renderNotes(notes);
  });
  
  // Notları arayüze render edecek fonksiyon
  function renderNotes(notes) {
    // Bu fonksiyon notes dizisindeki her eleman için birer note elemanını arayüze renderlasın
  
    // Bir html elemanını arayüzden kaldırmak için remove metodu kullanılır.
  
    // mevcut note elemanlarını kaldır
    document.querySelectorAll(".note").forEach((item) => item.remove());
  
    // notes dizisindeki her elemanı dön
    notes.forEach((note) => {
      // Notes dizisindeki her eleman için bir html oluştur
      let noteHTML = `     <li class="note" data-id='${note.id}'>
     
          <div class="details">
            <h2 class="title">${note.title}</h2>
            <p class="description">${note.description}</p>
          </div>
  
  
          <div class="bottom">
            <span id="date">${note.date}</span>
  
            <div class="settings">
              <i class="bx bx-dots-horizontal-rounded"></i>
  
              <ul class="menu">
                <li class="edit-btn"><i class="bx bx-edit"></i> Düzenle</li>
                <li class="delete-btn"><i class="bx bx-trash-alt"></i> Sil</li>
              </ul>
            </div>
          </div>
        </li>`;
  
      // Oluşturulan html'i arayüze ekle
  
      // Eğer bir html elemanın öncesine veya sonrasına eleman eklemek istiyorsak bunu insertAdjacentHTML metodu ile yaparız.Bu metot eklenecek elemanın adından sonra . koyularak çağırılır parametre olarak hangi konuma ekleme yapılacağı ve hangi elemanın ekleneceğini ister.
  
      addBox.insertAdjacentHTML("afterend", noteHTML);
    });
  }
  
  // Menu kısmını görünür kılacak fonksiyon
  function showMenu(eleman) {
    // Bir html elemanının kapsayıcısına erişmek için parentElement metodu kullanılır
  
    // Tıklanılan elemanın kapsayıcısına erişip show classı ekle
    eleman.parentElement.classList.add("show");
  
    // Eklenen  show classını üç nokta haricinde bir yere tıklandıysa kaldır
    document.addEventListener("click", (e) => {
      // Tıklanılan eleman üç nokta değilse veya kapsam dışındaysa
      if (e.target.tagName != "I" || e.target != eleman) {
        eleman.parentElement.classList.remove("show");
      }
    });
  }
  
  // wrapper kısmındaki tıklanmaları izle
  wrapper.addEventListener("click", (e) => {
    // Tıklanılan eleman üç nokta mı ?
    if (e.target.classList.contains("bx-dots-horizontal-rounded")) {
      showMenu(e.target);
    }
    // Eğer sil butonuna tıklandıysa
    else if (e.target.classList.contains("delete-btn")) {
      // Kullanıcıdan silme işlemi için onay al
      const response = confirm("Bu notu silmek istediğinize eminmisiniz ?");
  
      // Eğer kullanıcı silme işlemini onayladıysa
      if (response) {
        // Tıklanılan note elemanını ilk olarak note dizisinden kaldır sonra localStorage'ı güncelle
        // Bir elemanın kapsayıcısına erişmek için parentElement metodu kullanacağımızı gördük.Fakat kapsam sayısı arttığında bu erişme işlemi biraz zahmetli olur.Bunu closest metodu ile daha kolay şekilde halledebiliriz.closest metodu erişilmek istenen elemanın spesifik bir özelliği belirtildiğinde istenilen elemana erişmemizi sağlar.
        //  e.target.parentElement.parentElement.parentElement.parentElement
  
        // Tıklanılan elemanın kapsayıcısı olan note elemanına eriş
        const note = e.target.closest(".note");
  
        // Erişilen elemanın id'sine eriş
        const noteId = parseInt(note.dataset.id);
  
        // Id'si bilinen elemanı notes dizisinden kaldır
        notes = notes.filter((note) => note.id != noteId);
  
        // localStorage'ı güncelle
        localStorage.setItem("notes", JSON.stringify(notes));
  
        // Notları render et
        renderNotes(notes);
      }
    }
    // Eğer düzenle butonuna tıklandıysa
    else if (e.target.classList.contains("edit-btn")) {
      // Tıklanılan note elemanının kapsayıcı olan note'a eriş
      const note = e.target.closest(".note");
      // Erişilen elemanın id'sini al
      const noteId = Number(note.dataset.id);
      // Id'si bilinen note elemanını notes dizisi içerisinde bul
      const foundedNote = notes.find((note) => note.id == noteId);
  
      // Popup'ı aç
      popupContainer.classList.add("show");
      popup.classList.add("show");
  
      // Popup içerisindeki input ve textarea elemanının değerlerine güncellenecek elamanın değerlerinden atama yap
      form[0].value = foundedNote.title;
      form[1].value = foundedNote.description;
  
      // Formu güncelleme moduna sokacak değişkenlere atama yap
      isUpdate = true;
      updateId = noteId;
  
      // Popup'ı güncelleme için düzenle
      popupTitle.textContent = "Update Item";
      submitBtn.textContent = "Update";
    }
  });
  
  document.addEventListener("DOMContentLoaded", renderNotes(notes));