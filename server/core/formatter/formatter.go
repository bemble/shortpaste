package formatter

import "fmt"

func IECFormat(sizeBytes int64) string {
	suffix := "B"
	num := float64(sizeBytes)
	units := []string{"", "Ki", "Mi", "Gi", "Ti", "Pi", "Ei", "Zi"}
	for _, unit := range units {
		if num < 1024.0 {
			return fmt.Sprintf("%3.1f%s%s", num, unit, suffix)
		}
		num = (num / 1024)
	}
	return fmt.Sprintf("%.1f%s%s", num, "Yi", suffix)
}
