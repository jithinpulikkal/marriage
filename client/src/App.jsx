import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Photos from "./pages/Photos.jsx";
import PhotoSections from "./pages/PhotoSections.jsx";
import PhotoGallery from "./pages/PhotoGallery.jsx";
import PhotoView from "./pages/PhotoView.jsx";
import WeddingAlbumHome from "./pages/WeddingAlbumHome.jsx";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/album" element={<WeddingAlbumHome />} />
                <Route path="/photos" element={<Photos />} />
                <Route path="/photos/:side" element={<PhotoSections />} />
                <Route path="/photos/:side/:section" element={<PhotoGallery />} />
                <Route path="/photos/view" element={<PhotoView />} />
            </Route>
        </Routes>
    );
}
