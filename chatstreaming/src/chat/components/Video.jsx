export const Video = () => {
    return (
        
            <div className="contenedor-video">
                <div className="embed-container">
                    <iframe 
                        src="https://www.youtube.com/embed/jcXQDEQusQ0" 
                        frameborder="0" 
                        allowfullscreen>
                    </iframe>
                    <div className="contenedor-props-video">
                        <h3>Clase 4 - Integracion por partes</h3>
                        <p>Profesor: Julio Profe</p>
                        <span>Comentarios:</span>
                    </div>
                </div>
            </div>
        
    )
}