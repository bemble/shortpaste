package config

import (
	"os"
	"testing"
)

func TestIsDebug(t *testing.T) {
	cases := []struct {
		value    string
		expected bool
	}{
		{"1", true},
		{"True", true},
		{"true", true},
		{"0", false},
		{"tRue", false},
		{"tRue", false},
	}

	for _, tc := range cases {
		t.Run(tc.value, func(t *testing.T) {
			os.Setenv("DEBUG", tc.value)

			isDebug := IsDebug()

			if tc.expected != isDebug {
				t.Fatalf("Expected is debug %t, but got %t", tc.expected, isDebug)
			}
		})
	}
}
