const GradientAnimation = (height = 100, width = 100, filter = 5, disable = false) => {
    return {
        '&:before': {
            content: '""',
            position: 'absolute',
            height: `${height}%`,
            width: `${width}%`,
            background: 'linear-gradient(132.56deg, #61CAFF 18.46%, #6651CE 54.34%, #FBB05B 83.84%)',
            zIndex: -1,
            filter: `blur(${filter}px)`,
            borderRadius: '5px',
            opacity: disable ? 1 : 0,
            transition: 'visibility 0s linear 0.2s, opacity 0.2s linear',
        },
        '&:hover': {
            '&:before': {
                opacity: 1,
            }
        }
    }
}

export default GradientAnimation;
