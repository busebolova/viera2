// =====================
// HOME EDITOR (DÜZGÜN SÜRÜM)
// =====================
const HomeEditor = () => {
  const home = content.home || {}

  // Helper: typewriterWords array update
  const updateWord = (index: number, value: string) => {
    const arr = [...(home.hero?.typewriterWords || [])]
    arr[index] = value
    updateNestedValue(["hero", "typewriterWords"], arr)
  }

  const addWord = () => {
    const arr = [...(home.hero?.typewriterWords || []), ""]
    updateNestedValue(["hero", "typewriterWords"], arr)
  }

  const removeWord = (index: number) => {
    const arr = [...(home.hero?.typewriterWords || [])]
    arr.splice(index, 1)
    updateNestedValue(["hero", "typewriterWords"], arr)
  }

  return (
    <div>

      {/* HERO */}
      <div style={cardStyle}>
        <h3 style={sectionTitleStyle}>Hero Bölümü</h3>

        {/* Title */}
        <label style={labelStyle}>Başlık</label>
        <input
          type="text"
          style={inputStyle}
          value={home.hero?.title || ""}
          onChange={(e) => updateNestedValue(["hero", "title"], e.target.value)}
        />

        {/* Description */}
        <div style={{ marginTop: "16px" }}>
          <label style={labelStyle}>Açıklama</label>
          <textarea
            style={textareaStyle}
            value={home.hero?.description || ""}
            onChange={(e) =>
              updateNestedValue(["hero", "description"], e.target.value)
            }
          />
        </div>

        {/* Typewriter Words */}
        <div style={{ marginTop: "16px" }}>
          <label style={labelStyle}>Typewriter Kelimeleri</label>

          {(home.hero?.typewriterWords || []).map((word: string, i: number) => (
            <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <input
                type="text"
                value={word}
                onChange={(e) => updateWord(i, e.target.value)}
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                style={{ ...uploadBtnStyle, backgroundColor: "#7f1d1d" }}
                onClick={() => removeWord(i)}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          <button
            onClick={addWord}
            style={{ ...uploadBtnStyle, backgroundColor: "#166534", marginTop: "8px" }}
          >
            <Plus size={16} /> Kelime Ekle
          </button>
        </div>

        {/* Button 1 */}
        <div style={{ marginTop: "16px" }}>
          <label style={labelStyle}>Buton 1 Metin</label>
          <input
            type="text"
            style={inputStyle}
            value={home.hero?.buttonText || ""}
            onChange={(e) => updateNestedValue(["hero", "buttonText"], e.target.value)}
          />

          <label style={labelStyle}>Buton 1 Link</label>
          <input
            type="text"
            style={inputStyle}
            value={home.hero?.buttonLink || ""}
            onChange={(e) => updateNestedValue(["hero", "buttonLink"], e.target.value)}
          />
        </div>

        {/* Button 2 */}
        <div style={{ marginTop: "16px" }}>
          <label style={labelStyle}>Buton 2 Metin</label>
          <input
            type="text"
            style={inputStyle}
            value={home.hero?.secondButtonText || ""}
            onChange={(e) => updateNestedValue(["hero", "secondButtonText"], e.target.value)}
          />

          <label style={labelStyle}>Buton 2 Link</label>
          <input
            type="text"
            style={inputStyle}
            value={home.hero?.secondButtonLink || ""}
            onChange={(e) => updateNestedValue(["hero", "secondButtonLink"], e.target.value)}
          />
        </div>
      </div>

      {/* EXPERIENCE */}
      <div style={cardStyle}>
        <h3 style={sectionTitleStyle}>Deneyim Bölümü</h3>

        <label style={labelStyle}>Başlık</label>
        <input
          type="text"
          style={inputStyle}
          value={home.experience?.title || ""}
          onChange={(e) => updateNestedValue(["experience", "title"], e.target.value)}
        />

        <label style={labelStyle}>Açıklama</label>
        <textarea
          style={textareaStyle}
          value={home.experience?.description || ""}
          onChange={(e) => updateNestedValue(["experience", "description"], e.target.value)}
        />
      </div>

      {/* STATS */}
      <div style={cardStyle}>
        <h3 style={sectionTitleStyle}>İstatistikler</h3>

        {[
          ["founded", "Kuruluş Yılı"],
          ["foundedLabel", "Kuruluş Etiketi"],
          ["employees", "Çalışan"],
          ["employeesLabel", "Çalışan Etiketi"],
          ["completedProjects", "Tamamlanan Projeler"],
          ["completedProjectsLabel", "Proje Etiketi"],
          ["experience", "Deneyim"],
          ["experienceLabel", "Deneyim Etiketi"]
        ].map(([key, label]) => (
          <div key={key} style={{ marginBottom: "12px" }}>
            <label style={labelStyle}>{label}</label>
            <input
              type="text"
              style={inputStyle}
              value={home.stats?.[key] || ""}
              onChange={(e) => updateNestedValue(["stats", key], e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <div style={cardStyle}>
        <h3 style={sectionTitleStyle}>Hakkımızda Bölümü</h3>

        <label style={labelStyle}>Badge</label>
        <input
          style={inputStyle}
          value={home.about?.badge || ""}
          onChange={(e) => updateNestedValue(["about", "badge"], e.target.value)}
        />

        <label style={labelStyle}>Başlık</label>
        <input
          style={inputStyle}
          value={home.about?.title || ""}
          onChange={(e) => updateNestedValue(["about", "title"], e.target.value)}
        />

        <label style={labelStyle}>Açıklama</label>
        <textarea
          style={textareaStyle}
          value={home.about?.description || ""}
          onChange={(e) => updateNestedValue(["about", "description"], e.target.value)}
        />

        <ImageUploadField
          label="Görsel"
          path={["about", "image"]}
          currentValue={home.about?.image || ""}
        />
      </div>

      {/* WHY US */}
      <div style={cardStyle}>
        <h3 style={sectionTitleStyle}>Neden Biz?</h3>

        <label style={labelStyle}>Başlık</label>
        <input
          style={inputStyle}
          value={home.whyUs?.title || ""}
          onChange={(e) => updateNestedValue(["whyUs", "title"], e.target.value)}
        />

        {(home.whyUs?.items || []).map((item: any, i: number) => (
          <div key={i} style={{ background: "#222", padding: 12, borderRadius: 8, marginTop: 12 }}>
            <label style={labelStyle}>Madde Başlık</label>
            <input
              style={inputStyle}
              value={item.title || ""}
              onChange={(e) =>
                updateNestedValue(["whyUs", "items", i, "title"], e.target.value)
              }
            />

            <label style={labelStyle}>Madde Açıklama</label>
            <textarea
              style={textareaStyle}
              value={item.description || ""}
              onChange={(e) =>
                updateNestedValue(["whyUs", "items", i, "description"], e.target.value)
              }
            />

            <button
              style={{ ...uploadBtnStyle, backgroundColor: "#7f1d1d", marginTop: "8px" }}
              onClick={() => removeItemFromArray(["whyUs", "items"], i)}
            >
              <Trash2 size={14} /> Sil
            </button>
          </div>
        ))}

        <button
          style={{ ...uploadBtnStyle, backgroundColor: "#166534", marginTop: "12px" }}
          onClick={() =>
            addItemToArray(["whyUs", "items"], {
              title: "",
              description: ""
            })
          }
        >
          <Plus size={14} /> Madde Ekle
        </button>
      </div>
    </div>
  )
}
