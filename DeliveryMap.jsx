"use client"
import { useEffect, useRef, useState } from "react"

export default function DeliveryMap({ pickupCoords, dropOffCoords, pickupLabel, dropOffLabel }) {
    const mapRef = useRef(null)
    const [routeInfo, setRouteInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [mapError, setMapError] = useState(null)

    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        if (!apiKey || !pickupCoords || !dropOffCoords) {
            setLoading(false)
            return
        }

        const initMap = () => {
            if (!mapRef.current) return

            const center = {
                lat: (pickupCoords.lat + dropOffCoords.lat) / 2,
                lng: (pickupCoords.lng + dropOffCoords.lng) / 2
            }

            const map = new window.google.maps.Map(mapRef.current, {
                zoom: 15,
                center,
                disableDefaultUI: true,
                zoomControl: true,
                styles: [
                    { featureType: "poi", stylers: [{ visibility: "off" }] },
                    { featureType: "transit", stylers: [{ visibility: "off" }] }
                ]
            })

            const directionsService = new window.google.maps.DirectionsService()
            const directionsRenderer = new window.google.maps.DirectionsRenderer({
                polylineOptions: { strokeColor: "#c41230", strokeWeight: 5, strokeOpacity: 0.9 },
                suppressMarkers: false
            })
            directionsRenderer.setMap(map)

            directionsService.route({
                origin: pickupCoords,
                destination: dropOffCoords,
                travelMode: window.google.maps.TravelMode.WALKING
            }, (result, status) => {
                setLoading(false)
                if (status === "OK") {
                    directionsRenderer.setDirections(result)
                    const leg = result.routes[0].legs[0]
                    setRouteInfo({
                        distance: leg.distance.text,
                        duration: leg.duration.text
                    })
                } else {
                    setMapError("Could not calculate route between these locations.")
                }
            })
        }

        if (window.google && window.google.maps) {
            initMap()
            return
        }

        // Avoid adding the script more than once
        const existingScript = document.getElementById("google-maps-script")
        if (existingScript) {
            existingScript.addEventListener("load", initMap)
            return () => existingScript.removeEventListener("load", initMap)
        }

        const script = document.createElement("script")
        script.id = "google-maps-script"
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
        script.async = true
        script.defer = true
        script.onload = initMap
        script.onerror = () => {
            setLoading(false)
            setMapError("Failed to load Google Maps. Check your API key.")
        }
        document.head.appendChild(script)
    }, [pickupCoords, dropOffCoords])

    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        return (
            <p style={{ color: "#aaa", fontSize: 13, marginTop: 8, textAlign: "center" }}>
                Add <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to .env.local to enable the map.
            </p>
        )
    }

    return (
        <div style={{ marginTop: 16 }}>
            {/* Labels */}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 6 }}>
                <span>📍 From: <strong style={{ color: "#333" }}>{pickupLabel}</strong></span>
                <span>🏁 To: <strong style={{ color: "#333" }}>{dropOffLabel}</strong></span>
            </div>

            {/* Map container */}
            <div style={{ position: "relative" }}>
                <div
                    ref={mapRef}
                    style={{
                        width: "100%",
                        height: 260,
                        borderRadius: 10,
                        background: "#e8e8e8",
                        overflow: "hidden",
                        border: "1px solid #ddd"
                    }}
                />
                {loading && (
                    <div style={{
                        position: "absolute", inset: 0, display: "flex",
                        alignItems: "center", justifyContent: "center",
                        background: "rgba(255,255,255,0.7)", borderRadius: 10,
                        fontSize: 13, color: "#888"
                    }}>
                        Loading map...
                    </div>
                )}
            </div>

            {/* Route info strip */}
            {routeInfo && (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 32,
                    marginTop: 10,
                    padding: "10px 20px",
                    background: "#fff5f5",
                    borderRadius: 8,
                    border: "1px solid #f9c6c6",
                    fontSize: 14
                }}>
                    <span>📏 <strong>Distance:</strong> {routeInfo.distance}</span>
                    <span>⏱ <strong>ETA:</strong> {routeInfo.duration} on foot</span>
                </div>
            )}

            {mapError && (
                <p style={{ color: "#c41230", fontSize: 13, marginTop: 8, textAlign: "center" }}>
                    {mapError}
                </p>
            )}
        </div>
    )
}
