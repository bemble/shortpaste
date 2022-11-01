package database

import "time"

type Model struct {
	ID        string    `gorm:"primaryKey" json:"id" validate:"required,min=3,max=32,alphanumunicode"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	HitCount  int64     `json:"hit_count" validate:"isdefault"`
}

type Link struct {
	Model
	Link string `json:"link" validate:"required,url"`
}

type File struct {
	Model
	Name          string `json:"name"`
	MIME          string `json:"mime" validate:"required"`
	DownloadCount int64  `json:"download_count" validate:"isdefault"`
}

type Text struct {
	Model
	Type          string `validate:"omitempty,oneof=txt md" json:"type"`
	Text          string `gorm:"-" json:"text,omitempty"`
	NoHighlight   bool   `json:"no_highlight"`
	DownloadCount int64  `json:"download_count" validate:"isdefault"`
}
