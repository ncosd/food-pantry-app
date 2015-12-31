package shop

import (
	"google.golang.org/appengine/aetest"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestIndexHandler(t *testing.T) {
	_, done, err := aetest.NewContext()
	if err != nil {
		t.Fatal(err)
	}
	defer done()

	inst, err := aetest.NewInstance(nil)
	if err != nil {
		t.Errorf("Failed to create instance: %v", err)
	}
	defer inst.Close()

	request, err := inst.NewRequest("GET", "/", nil)
	if err != nil {
		t.Errorf("Error creating new instance %v", err)
	}

	response := httptest.NewRecorder()
	IndexHandler(response, request)
	if response.Code != http.StatusFound {
		t.Errorf("Did not get StatusFound(302) got %v", response.Code)
	}
	if response.Header().Get("Location") != "/index.html" {
		t.Errorf("Expected Location: /index.html but instead got %v", response.Header().Get("Location"))
	}
}
