package shop

import (
	"net/http"
)

func init() {
	http.HandleFunc("/", IndexHandler)
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/index.html", http.StatusFound)
}
