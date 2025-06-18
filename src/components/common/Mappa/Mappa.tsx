const StaticMap = ({ locationName, full }: { locationName: string, full?: boolean }) => {
    const handleClick = () => {
        if (locationName) {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationName)}`;
            window.open(url, '_blank');
        }
    };

    const mapUrl = locationName
        ? `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(locationName)}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${encodeURIComponent(locationName)}&key=AIzaSyChk89dukymtLY_M7uYS3ZdRcu9z9p9-us`
        : null;

    return (
        <div
            style={{
                height: full ? 260 : 120,
                backgroundColor: '#f5f7fa',
                borderRadius: 8,
                overflow: 'hidden',
                marginTop: 8,
                position: 'relative',
            }}
        >
            {locationName && mapUrl ? (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url('${mapUrl}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        onClick={handleClick}
                        style={{
                            background: 'rgba(235, 93, 36, 0.9)',
                            color: 'white',
                            padding: '8px 12px',
                            borderRadius: 20,
                            fontSize: 12,
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            userSelect: 'none',
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleClick();
                            }
                        }}
                    >
                        <span style={{ marginRight: 6 }}>🚗</span>
                        Come arrivare
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: '#8795a4',
                    }}
                >
                    Mappa non disponibile
                </div>
            )}
        </div>
    );
}

export default StaticMap;