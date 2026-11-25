from app.main import _static_file


def test_health(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"ok": True}


def test_unknown_paths_are_404(client, tmp_path, monkeypatch):
    monkeypatch.setenv("STATIC_DIR", str(tmp_path))
    (tmp_path / "index.html").write_text("home", encoding="utf-8")
    (tmp_path / "assets").mkdir()
    (tmp_path / "assets" / "app.js").write_text("js", encoding="utf-8")
    outside = tmp_path.parent / "not-in-dist.txt"
    outside.write_text("secret", encoding="utf-8")

    assert client.get("/").status_code == 200
    assert client.get("/").text == "home"
    assert client.get("/assets/app.js").status_code == 200
    assert client.get("/assets/app.js").text == "js"
    assert client.get("/missing").status_code == 404
    assert client.get("/api/missing").status_code == 404
    assert client.post("/api/missing").status_code == 404
    assert client.get("/docs").status_code == 404
    assert _static_file("../not-in-dist.txt") is None

    outside.unlink(missing_ok=True)
