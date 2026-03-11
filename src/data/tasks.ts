export type Difficulty = "Kolay" | "Orta" | "Zor";

export type PlanItem = {
  id: number;
  title: string;
  category: string;
  minutes: number;
  difficulty: Difficulty;
  instructions: string;
};

export const TASKS_BY_FOCUS: Record<string, PlanItem[]> = {
  Teknik: [
    {
      id: 1,
      title: "Alternate picking netliği",
      category: "Teknik",
      minutes: 6,
      difficulty: "Orta",
      instructions:
        "String crossing içeren kısa kalıpları temiz ve kontrollü çal.",
    },
    {
      id: 2,
      title: "Legato akıcılığı",
      category: "Teknik",
      minutes: 7,
      difficulty: "Kolay",
      instructions:
        "Hammer-on ve pull-off’ları eşit ses seviyesinde tutmaya çalış.",
    },
    {
      id: 3,
      title: "Dinamik kontrollü vibrato",
      category: "Teknik",
      minutes: 8,
      difficulty: "Kolay",
      instructions:
        "Aynı notaya dar, geniş ve gecikmeli vibrato karakterleri uygula.",
    },
    {
      id: 4,
      title: "Asimetrik picking",
      category: "Teknik",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Kısa bir picking motifi kur ve tel geçişlerinde temizliği koru.",
    },
    {
      id: 5,
      title: "Palm mute netliği",
      category: "Teknik",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Alt tellerde palm mute yoğunluğunu değiştirerek atak kontrolünü sabit tut.",
    },
    {
      id: 6,
      title: "String skipping doğruluğu",
      category: "Teknik",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Komşu olmayan teller arasında kısa motifler kur ve atlamalarda temizliği koru.",
    },
    {
      id: 7,
      title: "Hız patlamaları",
      category: "Teknik",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Kısa burst pattern’lerle hızlan, sonra hemen kontrollü tempoya dön ve temizliği bozma.",
    },
    {
      id: 8,
      title: "Pozisyon geçiş akıcılığı",
      category: "Teknik",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Aynı fikri iki farklı pozisyonda çal ve geçiş sırasında zamanlamayı sabit tut.",
    },
    {
      id: 9,
      title: "Hybrid picking kontrolü",
      category: "Teknik",
      minutes: 7,
      difficulty: "Zor",
      instructions:
        "Pena ve parmak kombinasyonunu kısa arpejlerde temiz ve dengeli kullan.",
    },
    {
      id: 10,
      title: "Bend intonasyon sabitleme",
      category: "Teknik",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Yarım ve tam bendleri referans notayla karşılaştırarak doğru perdeye oturt.",
    },
    {
      id: 11,
      title: "Sliding geçiş netliği",
      category: "Teknik",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Kısa melodilerde slide giriş ve çıkışlarını gereksiz gürültü oluşturmadan yap.",
    },
    {
      id: 12,
      title: "Economy picking akışı",
      category: "Teknik",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Yön ekonomisini bozmadan üç telli kısa diziler üzerinde akışı koru.",
    },
    {
      id: 13,
      title: "Sağ el aksan kontrolü",
      category: "Teknik",
      minutes: 6,
      difficulty: "Orta",
      instructions:
        "Aynı pattern içinde seçili notaları öne çıkar, diğer notaların hacmini düşür.",
    },
    {
      id: 14,
      title: "Sol el bağımsızlığı",
      category: "Teknik",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Parmak kombinasyonlarını yavaş tempoda eşit kuvvet ve zamanlamayla uygula.",
    },
    {
      id: 15,
      title: "Sustain kontrolü",
      category: "Teknik",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Çaldığın notaların gereksizce kesilmemesine ve geçişlerde temiz kalmasına odaklan.",
    },
    {
      id: 16,
      title: "String noise temizliği",
      category: "Teknik",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Sessizleme tekniklerini kullanarak pozisyon değişimlerinde istenmeyen tel seslerini azalt.",
    },
    {
      id: 17,
      title: "Tek tel hız kontrolü",
      category: "Teknik",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Tek tel üzerinde kısa tekrar kalıplarıyla pena tutarlılığını geliştir.",
    },
    {
      id: 18,
      title: "Arpej artikülasyonu",
      category: "Teknik",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Üç ve dört sesli arpejleri her notanın net duyulacağı biçimde parçala.",
    },
    {
      id: 19,
      title: "Staccato kontrolü",
      category: "Teknik",
      minutes: 6,
      difficulty: "Orta",
      instructions:
        "Kısa notalı çalımda vuruşu net tut, sesleri tam zamanında kes.",
    },
    {
      id: 20,
      title: "Tremolo picking dayanıklılığı",
      category: "Teknik",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Kısa süreli tremolo picking bölümlerinde gerginleşmeden sürekliliği koru.",
    },
    {
      id: 21,
      title: "Muted string crossing",
      category: "Teknik",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Susturulmuş teller üstünden geçerken ritmi bozmadan sağ el yolunu kontrol et.",
    },
    {
      id: 22,
      title: "Geniş aralık sıçramaları",
      category: "Teknik",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Büyük aralık atlayan melodik kalıplarda sol el isabetini koru.",
    },
    {
      id: 23,
      title: "Finger roll netliği",
      category: "Teknik",
      minutes: 7,
      difficulty: "Zor",
      instructions:
        "Aynı parmakla iki tele geçerken notaları ezmeden ve bulanıklaştırmadan çal.",
    },
    {
      id: 24,
      title: "Volume knob kontrolü",
      category: "Teknik",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Volume potunu kullanarak giriş ve çıkışları kontrollü hale getir, dinamik farkı duy.",
    },
    {
      id: 25,
      title: "Accent displacement picking",
      category: "Teknik",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Sabit pena akışı içinde aksanı farklı notalara kaydır ve düzeni koru.",
    },
    {
      id: 113,
      title: "Akor geçiş sessizliği",
      category: "Teknik",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "İki basit akor arasında geçerken boş tellerin istemsiz çalmasını engelle.",
    },
    {
      id: 114,
      title: "Comping pena tutarlılığı",
      category: "Teknik",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Sabit 8’lik vuruşta her tel temasının hacmini eşitle ve groove’u düşürme.",
    },
    {
      id: 115,
      title: "Çift ses bend dengesi",
      category: "Teknik",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "İki notalı bend cümlelerinde üst ses intonasyonunu korurken alt sesi temiz tut.",
    },
    {
      id: 116,
      title: "Slide ile akor bağlantısı",
      category: "Teknik",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Yakın iki akor formunu slide girişlerle bağla, geçişte zamanlamayı bozma.",
    },
  ],

  Teori: [
    {
      id: 26,
      title: "Modal renk farkı",
      category: "Teori",
      minutes: 6,
      difficulty: "Orta",
      instructions:
        "Aynı kök üstünde iki modun hissini kısa melodilerle karşılaştır.",
    },
    {
      id: 27,
      title: "Interval haritalama",
      category: "Teori",
      minutes: 7,
      difficulty: "Kolay",
      instructions:
        "Maj3, min7 ve 9’lu aralıkları sap üstünde hızlıca bul.",
    },
    {
      id: 28,
      title: "Fusion chord color",
      category: "Teori",
      minutes: 8,
      difficulty: "Orta",
      instructions:
        "Maj7, 9 ve sus renklerini tek tonal merkez üstünde dene.",
    },
    {
      id: 29,
      title: "Triad bağlantıları",
      category: "Teori",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Yakın pozisyon triadleri sap üstünde bağlayarak kısa akor hareketleri kur.",
    },
    {
      id: 30,
      title: "Majör-minör tonal merkez ayrımı",
      category: "Teori",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Aynı kökten majör ve minör duyumun nasıl değiştiğini kısa örneklerle incele.",
    },
    {
      id: 31,
      title: "Chord tone hedefleri",
      category: "Teori",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Akor değişiminde 3 ve 7 derecelerinin nasıl yön duygusu verdiğini sapta göster.",
    },
    {
      id: 32,
      title: "Secondary dominant mantığı",
      category: "Teori",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Geçici dominantların çözülme yönünü basit bir progresyonda takip et.",
    },
    {
      id: 33,
      title: "Borrowed chord tadı",
      category: "Teori",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Paralel minörden ödünç alınan akorların duyum farkını kısa örneklerle dene.",
    },
    {
      id: 34,
      title: "Pentatonik dışına çıkış notaları",
      category: "Teori",
      minutes: 6,
      difficulty: "Orta",
      instructions:
        "Pentatonik yapı içine eklenen 2 veya b5 gibi notaların rengi nasıl değiştirdiğini dinle.",
    },
    {
      id: 35,
      title: "Guide tone farkındalığı",
      category: "Teori",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "3 ve 7 derecelerini akor geçişlerinde guide tone olarak takip et.",
    },
    {
      id: 36,
      title: "Akor formülü ezberi",
      category: "Teori",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Maj7, min7, dom7 ve m7b5 akorlarının derece formüllerini yüksek sesle tekrar et.",
    },
    {
      id: 37,
      title: "Sap üstünde derece görme",
      category: "Teori",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Bir kök seç ve o tona ait 1, 3, 5, 7 derecelerini farklı tellerde bul.",
    },
    {
      id: 38,
      title: "Polychord fikrine giriş",
      category: "Teori",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Bir bas ses üstünde farklı üst yapı triadlerinin verdiği rengi gözlemle.",
    },
    {
      id: 39,
      title: "Blues harmony özeti",
      category: "Teori",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "I-IV-V ilişkisini ve dominant karakteri 12 bar mantığı içinde düşün.",
    },
    {
      id: 40,
      title: "Mixolydian kullanım mantığı",
      category: "Teori",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Dominant akor üstünde neden mixolydian işe yarıyor, derece bazında açıkla.",
    },
    {
      id: 41,
      title: "Dorian ve Aeolian ayrımı",
      category: "Teori",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "6. derecenin minör duyumu nasıl değiştirdiğini kısa cümlelerle karşılaştır.",
    },
    {
      id: 42,
      title: "Reharmonization başlangıcı",
      category: "Teori",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Basit bir akor yürüyüşünde yerine kullanılabilecek alternatif akorları düşün.",
    },
    {
      id: 43,
      title: "Triad pair mantığı",
      category: "Teori",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "İki triad setini sırayla kullanarak modern renk fikri oluştur.",
    },
    {
      id: 44,
      title: "Tonal merkez koruma",
      category: "Teori",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Farklı renkler denerken kök duygusunun ne zaman kaybolduğunu dinle.",
    },
    {
      id: 45,
      title: "Sus akor işlevi",
      category: "Teori",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Sus2 ve sus4 yapılarının çözülme beklentisini küçük örneklerle gözlemle.",
    },
    {
      id: 46,
      title: "Voice leading farkındalığı",
      category: "Teori",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Akorlar arası ortak sesleri ve en kısa hareket eden sesleri takip et.",
    },
    {
      id: 47,
      title: "Akor-skala eşleşmesi",
      category: "Teori",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Bir akor tipi için neden belirli skala renklerinin uyduğunu kısa notlarla düşün.",
    },
    {
      id: 48,
      title: "b9 ve #11 duyumu",
      category: "Teori",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Gergin renklerin çözülme isteğini dominant merkezde dinle.",
    },
    {
      id: 49,
      title: "Power chord ötesine geçiş",
      category: "Teori",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "5’li akorlara 2, 6 veya 9 ekleyince riffin karakteri nasıl değişiyor incele.",
    },
    {
      id: 50,
      title: "Kromatik yaklaşım teorisi",
      category: "Teori",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Hedef notaya yarım ses üstten ve alttan yaklaşmanın gerilim etkisini değerlendir.",
    },
    {
      id: 117,
      title: "Tek tel nota bulma",
      category: "Teori",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Tek bir tel seç ve verilen notaları pozisyon atlamadan en yakın yerde bul.",
    },
    {
      id: 118,
      title: "Oktav eşleme rotaları",
      category: "Teori",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Bir notayı farklı tel setlerinde oktav ilişkileriyle hızlıca eşleştir.",
    },
    {
      id: 119,
      title: "Aynı notayı üç bölgede görme",
      category: "Teori",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Aynı perde adını sapın alt, orta ve üst bölgesinde gecikmeden bul.",
    },
    {
      id: 120,
      title: "String set triad taraması",
      category: "Teori",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Üç komşu tel grubunda majör ve minör triad şekillerini sırayla çıkar.",
    },
    {
      id: 121,
      title: "Dereceyi söyle çal",
      category: "Teori",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Bir kök belirle, çaldığın her notanın derece adını sesli söyle.",
    },
    {
      id: 122,
      title: "Duyup bul tek nota",
      category: "Teori",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Rastgele çaldığın tek notayı dinleyip aynı sesi başka telde yakala.",
    },
    {
      id: 123,
      title: "Kökten akor tonu bulma",
      category: "Teori",
      minutes: 8,
      difficulty: "Orta",
      instructions:
        "Bir akor adı seç, kökten başlayıp 3 ve 5 seslerini yakın bölgede yerleştir.",
    },
    {
      id: 124,
      title: "Pozisyonlar arası triad bağlama",
      category: "Teori",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Aynı triadi iki farklı tel setinde bağlayıp aradaki ortak sesleri koru.",
    },
    {
      id: 125,
      title: "Söyle sonra çal",
      category: "Teori",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Kısa bir iki notalı fikir mırıldan, sonra aynı aralığı gitarda bul.",
    },
    {
      id: 126,
      title: "İniş notasını önceden duyma",
      category: "Teori",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Bir akor değişmeden önce ineceğin chord tone’u zihninde duyup sonra çal.",
    },
  ],

  Ritim: [
    {
      id: 51,
      title: "16’lık subdivision kontrolü",
      category: "Ritim",
      minutes: 6,
      difficulty: "Orta",
      instructions:
        "Metronomla 16’lık hissi bozmadan aksan yerlerini değiştir.",
    },
    {
      id: 52,
      title: "Odd meter groove",
      category: "Ritim",
      minutes: 7,
      difficulty: "Zor",
      instructions:
        "5 veya 7 zaman hissinde kısa bir ritmik hücre oluştur.",
    },
    {
      id: 53,
      title: "Progressive riff varyasyonu",
      category: "Ritim",
      minutes: 8,
      difficulty: "Orta",
      instructions:
        "Kısa bir motif kur ve eksilterek/uzatarak yeni varyasyonlar üret.",
    },
    {
      id: 54,
      title: "Ghost note yerleşimi",
      category: "Ritim",
      minutes: 8,
      difficulty: "Kolay",
      instructions:
        "Sessiz vuruşları aynı akor üstünde groove hissini bozmayacak şekilde yerleştir.",
    },
    {
      id: 55,
      title: "Backbeat sabitleme",
      category: "Ritim",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "2 ve 4 hissini net tutarak sade ritim kalıpları çal.",
    },
    {
      id: 56,
      title: "Triplet ve straight geçişi",
      category: "Ritim",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Aynı motifte düz ve üçlemeli hissi art arda deneyerek zaman duygunu kontrol et.",
    },
    {
      id: 57,
      title: "Aksan kaydırma",
      category: "Ritim",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Sabit kalıpta aksanı her turda bir nota sağa kaydır.",
    },
    {
      id: 58,
      title: "Boşluk bırakma disiplini",
      category: "Ritim",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Her ölçüde bilinçli sessizlik alanı bırak ve groove’un düşüp düşmediğini dinle.",
    },
    {
      id: 59,
      title: "Polyrhythm başlangıcı",
      category: "Ritim",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "3’e karşı 4 hissini basit vurgu düzenleriyle dene.",
    },
    {
      id: 60,
      title: "Tek akor groove üretimi",
      category: "Ritim",
      minutes: 7,
      difficulty: "Kolay",
      instructions:
        "Tek bir akorla sadece ritmik yerleşimi değiştirerek farklı karakterler yarat.",
    },
    {
      id: 61,
      title: "Syncopation odaklı comping",
      category: "Ritim",
      minutes: 8,
      difficulty: "Orta",
      instructions:
        "Güçlü zaman dışına yerleşen vuruşlarla comping cümleleri kur.",
    },
    {
      id: 62,
      title: "Palm mute groove katmanları",
      category: "Ritim",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Aynı riffte açık ve mute vuruşları farklı kombinasyonlarla dene.",
    },
    {
      id: 63,
      title: "Metronomu 2 ve 4 duyma",
      category: "Ritim",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Metronomu arka vuruş gibi hisset ve groove’un kayıp kaymadığını kontrol et.",
    },
    {
      id: 64,
      title: "Riff içi duraksama tasarımı",
      category: "Ritim",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Riffin içine kısa duraklar yerleştirerek gerilim ve beklenti yarat.",
    },
    {
      id: 65,
      title: "Uzun-kısa nota dengesi",
      category: "Ritim",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Kısa ve uzun notaları sırayla kullanarak ritmik karakteri değiştir.",
    },
    {
      id: 66,
      title: "7/8 bölme denemeleri",
      category: "Ritim",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "7/8’i 2+2+3 ve 3+2+2 gibi farklı alt gruplarla hisset.",
    },
    {
      id: 67,
      title: "Swing yoğunluğu ayarı",
      category: "Ritim",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Aynı groove’u daha düz ve daha sallanan iki farklı hissiyatla çal.",
    },
    {
      id: 68,
      title: "Tek notalı ritmik motifler",
      category: "Ritim",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Sadece tek bir perde kullanarak ritim üzerinden karakter yarat.",
    },
    {
      id: 69,
      title: "Cross-rhythm riff fikri",
      category: "Ritim",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Düz ölçü üstünde farklı vurgu bölmeleriyle çapraz his oluşturan riff kur.",
    },
    {
      id: 70,
      title: "Subdivision duyarlılığı",
      category: "Ritim",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Aynı tempoda 8’lik, 16’lık ve üçleme alt bölümleri arasında geçiş yap.",
    },
    {
      id: 127,
      title: "Düz 8’lik strumming dengesi",
      category: "Ritim",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Açık akorlarla sabit 8’lik çal, down-up akışında vuruş yüksekliğini eşitle.",
    },
    {
      id: 128,
      title: "Akor değişimi zamanlama disiplini",
      category: "Ritim",
      minutes: 7,
      difficulty: "Kolay",
      instructions:
        "İki akor arasında sadece doğru vuruşta geç ve eldeki aceleyi azalt.",
    },
    {
      id: 129,
      title: "Off-beat comping yerleşimi",
      category: "Ritim",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Vuruşların arasına yerleşen kısa comping darbeleriyle groove kur.",
    },
    {
      id: 130,
      title: "Susturmalı funk comping",
      category: "Ritim",
      minutes: 8,
      difficulty: "Orta",
      instructions:
        "Kısa akor vuruşlarıyla sol el susturmasını birleştir, net başlatıp net kes.",
    },
    {
      id: 131,
      title: "İki akorlu groove taşıma",
      category: "Ritim",
      minutes: 7,
      difficulty: "Kolay",
      instructions:
        "Aynı ritmik kalıbı iki akor arasında bozmadan sürdür.",
    },
    {
      id: 132,
      title: "Dinamik katmanlı strumming",
      category: "Ritim",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Ölçü içinde bazı vuruşları geri çekip bazılarını öne çıkararak akışı renklendir.",
    },
    {
      id: 133,
      title: "Anticipation girişleri",
      category: "Ritim",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Akoru bir sonraki güçlü zamandan hemen önce getirip zaman hissini kaybetme.",
    },
    {
      id: 134,
      title: "Dur-kalk ritim gitarı",
      category: "Ritim",
      minutes: 8,
      difficulty: "Orta",
      instructions:
        "Sürekli akış yerine kısa duruşlarla çalışan bir comping kalıbı oluştur.",
    },
  ],

  Doğaçlama: [
    {
      id: 71,
      title: "Blues-rock çağrı cevap",
      category: "Doğaçlama",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "İki ölçülük soru ve cevap cümleleri üret, boşluk kullanımına dikkat et.",
    },
    {
      id: 72,
      title: "Fusion kromatik yaklaşım",
      category: "Doğaçlama",
      minutes: 7,
      difficulty: "Zor",
      instructions:
        "Chord tone hedefleyerek kısa kromatik geçişler dene.",
    },
    {
      id: 73,
      title: "Tarz odaklı solo girişi",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Orta",
      instructions:
        "Modern progressive ya da blues-rock tadında 4 ölçülük bir solo giriş fikri geliştir.",
    },
    {
      id: 74,
      title: "Motif geliştirme",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Orta",
      instructions:
        "Kısa bir melodik fikir kur ve aynı fikri üç farklı şekilde değiştir.",
    },
    {
      id: 75,
      title: "Tek tel melodik anlatım",
      category: "Doğaçlama",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Sadece tek tel kullanarak anlamlı ve nefes alan kısa cümleler üret.",
    },
    {
      id: 76,
      title: "Chord tone soloing",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Orta",
      instructions:
        "Her akor değişiminde iniş notanı chord tone olacak şekilde planla.",
    },
    {
      id: 77,
      title: "Outside note dokunuşları",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Kısa süreli dış notaları kullanıp hızlıca içeri çözülmeyi dene.",
    },
    {
      id: 78,
      title: "Blues bend cümleleri",
      category: "Doğaçlama",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Bend merkezli üç kısa blues-rock cümlesi kur ve her birini farklı bitir.",
    },
    {
      id: 79,
      title: "Arpej tabanlı modern çizgiler",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Arpej notalarını düz ezber gibi değil, ritmik kırılımlarla kullan.",
    },
    {
      id: 80,
      title: "Boşluk odaklı solo",
      category: "Doğaçlama",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Çaldığından daha az çalmayı hedefle; her cümleden sonra bilinçli dur.",
    },
    {
      id: 81,
      title: "Ritmik motiften solo üretimi",
      category: "Doğaçlama",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Önce bir ritmik hücre bul, sonra aynı ritim üstünde farklı notalar dene.",
    },
    {
      id: 82,
      title: "Fusion phrasing kırılmaları",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Uzun line yerine kısa ama beklenmedik yön değiştiren cümleler oluştur.",
    },
    {
      id: 83,
      title: "Pentatonik genişletme",
      category: "Doğaçlama",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Pentatonik iskelete 2 veya 6 ekleyerek daha modern bir duyum kur.",
    },
    {
      id: 84,
      title: "Tek nota tekrarlarıyla gerilim",
      category: "Doğaçlama",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Aynı notayı ritmik ve dinamik değişimlerle gerilim yaratacak şekilde tekrarla.",
    },
    {
      id: 85,
      title: "Guide tone doğaçlama",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Cümle sonlarını 3 ve 7 derecelere indirerek yön hissini kuvvetlendir.",
    },
    {
      id: 86,
      title: "Blues-rock açılış cümleleri",
      category: "Doğaçlama",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Solo başlatmak için kullanılabilecek üç kısa giriş fikri oluştur.",
    },
    {
      id: 87,
      title: "Melodik sekans denemeleri",
      category: "Doğaçlama",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Kısa bir fikir kur ve onu farklı derecelerden başlatarak sırala.",
    },
    {
      id: 88,
      title: "Modal solo denemesi",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Orta",
      instructions:
        "Tek bir modun karakterini koruyarak kısa ama tutarlı bir solo kur.",
    },
    {
      id: 89,
      title: "Düşük notalardan solo başlatma",
      category: "Doğaçlama",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Her zamanki yüksek bölge alışkanlığını kırıp alt register’dan cümle kur.",
    },
    {
      id: 90,
      title: "Kromatik enclosure",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Hedef notayı üst-alt kromatik sarıp çözülme duygusunu duy.",
    },
    {
      id: 91,
      title: "Ritmik sessizlikli lickler",
      category: "Doğaçlama",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Cümle içine kısa suslar yerleştir ve lickin akışının nasıl değiştiğini gözlemle.",
    },
    {
      id: 92,
      title: "Vibrato merkezli anlatım",
      category: "Doğaçlama",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Az nota kullan ama notaların sonunu vibrato karakteriyle şekillendir.",
    },
    {
      id: 93,
      title: "Triad pair doğaçlama",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "İki triad malzemesini dönüşümlü kullanarak modern line duygusu yarat.",
    },
    {
      id: 94,
      title: "Blues-rock final cümlesi",
      category: "Doğaçlama",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Solo bitirişinde kullanılabilecek güçlü bir kapanış fikri geliştir.",
    },
    {
      id: 95,
      title: "Register değişimiyle gerilim",
      category: "Doğaçlama",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Cümleyi alt bölgede başlat, sonra aniden üst register’a çıkarak kontrast yarat.",
    },
    {
      id: 96,
      title: "Line bağlama disiplini",
      category: "Doğaçlama",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Her yeni cümleyi bir öncekinin son notasından mantıklı bir şekilde türet.",
    },
    {
      id: 97,
      title: "Progressive solo kırılmaları",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Düzenli phrase beklentisini bozacak kısa ritmik ve melodik kırılmalar dene.",
    },
    {
      id: 98,
      title: "Az notayla ifade",
      category: "Doğaçlama",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Üç ya da dört notayla etkili bir mini solo hissi yaratmaya çalış.",
    },
    {
      id: 99,
      title: "Motifi ters çevirme",
      category: "Doğaçlama",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Kurduğun kısa melodik fikrin yönünü tersine çevirip yeni varyasyon üret.",
    },
    {
      id: 100,
      title: "Fusion çözülme noktaları",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Gerilimli line’ları hangi notalarda çözdüğünde daha ikna edici duyulduğunu araştır.",
    },
    {
      id: 135,
      title: "Söyle ve çal cevap cümlesi",
      category: "Doğaçlama",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Kısa bir cevap cümlesini önce mırıldan, sonra aynı konturu gitarda bul.",
    },
    {
      id: 136,
      title: "Kopyalanan lick varyasyonu",
      category: "Doğaçlama",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Bildiğin bir lick’i ritmini koruyup son iki notasını değiştirerek uyarl.",
    },
    {
      id: 137,
      title: "Rifften solo cümlesi çıkarma",
      category: "Doğaçlama",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Çaldığın riffin ritmik iskeletini kullanıp üstüne tek notalı bir lead cümlesi kur.",
    },
    {
      id: 138,
      title: "Akor yürüyüşüne iniş notaları",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Orta",
      instructions:
        "Basit bir progresyonda her ölçüyü seçilmiş bir chord tone üzerinde bitir.",
    },
    {
      id: 139,
      title: "Melodiyi başka pozisyona taşıma",
      category: "Doğaçlama",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Kısa bir melodiyi aynı ritmi koruyarak sapın başka bir bölgesinde tekrar çal.",
    },
    {
      id: 140,
      title: "Şarkı cümlesini cevaplama",
      category: "Doğaçlama",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Varsaydığın bir vokal cümlesine gitarla boşluk bırakan kısa bir cevap ver.",
    },
    {
      id: 141,
      title: "Mikro transkripsiyon uyarlaması",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Kısa bir duyduğun fraseyi çıkarıp tonal merkeze uydurarak yeniden çal.",
    },
    {
      id: 142,
      title: "Ritmik kopya notasal fark",
      category: "Doğaçlama",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Hazır bir ritmik cümleyi aynen koru ama notaları yeni hedef tonlara taşı.",
    },
    {
      id: 143,
      title: "Mini repertuvar fragmanı",
      category: "Doğaçlama",
      minutes: 7,
      difficulty: "Kolay",
      instructions:
        "Sevdiğin bir parçadan iki ölçülük fikir çıkar, his ve artikülasyonu koruyarak çal.",
    },
    {
      id: 144,
      title: "Tekniği cümleye taşıma",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Slide, bend veya legato öğesini sadece gösteriş değil ifade amacıyla bir cümlede kullan.",
    },
  ],

  Kararsızım: [
    {
      id: 101,
      title: "Progressive riff varyasyonu",
      category: "Ritim",
      minutes: 6,
      difficulty: "Orta",
      instructions:
        "Kısa bir motif kur ve onu eksilterek veya uzatarak varyasyon üret.",
    },
    {
      id: 102,
      title: "Tarz odaklı solo girişi",
      category: "Doğaçlama",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Modern progressive veya blues-rock tadında 4 ölçülük bir solo giriş fikri geliştir.",
    },
    {
      id: 103,
      title: "Blues-rock bend kontrolü",
      category: "Teknik",
      minutes: 8,
      difficulty: "Kolay",
      instructions:
        "Yarım ve tam bendleri intonasyon bozulmadan sabit tutmaya çalış.",
    },
    {
      id: 104,
      title: "Fusion chord color",
      category: "Teori",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Akor renklerini kullanarak kısa ve modern bir armonik atmosfer kur.",
    },
    {
      id: 105,
      title: "String skipping doğruluğu",
      category: "Teknik",
      minutes: 7,
      difficulty: "Orta",
      instructions:
        "Komşu olmayan teller arasında kısa motifler kur ve atlamalarda temizliği koru.",
    },
    {
      id: 106,
      title: "Chord tone soloing",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Orta",
      instructions:
        "Akor değişimlerinde iniş notalarını chord tone olacak şekilde seç.",
    },
    {
      id: 107,
      title: "Ghost note yerleşimi",
      category: "Ritim",
      minutes: 8,
      difficulty: "Kolay",
      instructions:
        "Sessiz vuruşları aynı akor üstünde groove hissini bozmayacak şekilde yerleştir.",
    },
    {
      id: 108,
      title: "Triad bağlantıları",
      category: "Teori",
      minutes: 8,
      difficulty: "Zor",
      instructions:
        "Yakın pozisyon triadleri sap üstünde bağlayarak kısa akor hareketleri kur.",
    },
    {
      id: 109,
      title: "Palm mute netliği",
      category: "Teknik",
      minutes: 6,
      difficulty: "Kolay",
      instructions:
        "Alt tellerde palm mute yoğunluğunu değiştirerek atak kontrolünü sabit tut.",
    },
    {
      id: 110,
      title: "Modal solo denemesi",
      category: "Doğaçlama",
      minutes: 8,
      difficulty: "Orta",
      instructions:
        "Tek bir modun karakterini koruyarak kısa ama tutarlı bir solo kur.",
    },
    {
      id: 111,
      title: "Odd meter groove",
      category: "Ritim",
      minutes: 7,
      difficulty: "Zor",
      instructions:
        "5 veya 7 zaman hissinde kısa bir ritmik hücre oluştur.",
    },
    {
      id: 112,
      title: "Interval haritalama",
      category: "Teori",
      minutes: 7,
      difficulty: "Kolay",
      instructions:
        "Maj3, min7 ve 9’lu aralıkları sap üstünde hızlıca bul.",
    },
  ],
};
