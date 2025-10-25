// Typography Components - Định nghĩa tất cả font styles

export const H1 = ({ children, className = "" }) => (
    <h1 className={`text-4xl font-bold leading-tight ${className}`}>{children}</h1>
)

export const H2 = ({ children, className = "" }) => (
    <h2 className={`text-3xl font-bold leading-snug ${className}`}>{children}</h2>
)

export const H3 = ({ children, className = "" }) => (
    <h3 className={`text-2xl font-semibold leading-normal ${className}`}>{children}</h3>
)

export const H4 = ({ children, className = "" }) => (
    <h4 className={`text-xl font-semibold leading-normal ${className}`}>{children}</h4>
)

export const H5 = ({ children, className = "" }) => (
    <h5 className={`text-lg font-semibold leading-normal ${className}`}>{children}</h5>
)

export const H6 = ({ children, className = "" }) => (
    <h6 className={`text-base font-semibold leading-normal ${className}`}>{children}</h6>
)

// Body text variants
export const BodyLg = ({ children, className = "" }) => (
    <p className={`text-lg leading-relaxed text-gray-700 ${className}`}>{children}</p>
)

export const Body = ({ children, className = "" }) => (
    <p className={`text-base leading-relaxed text-gray-700 ${className}`}>{children}</p>
)

export const BodySm = ({ children, className = "" }) => (
    <p className={`text-sm leading-relaxed text-gray-600 ${className}`}>{children}</p>
)

// Caption and small text
export const Caption = ({ children, className = "" }) => (
    <small className={`text-xs leading-loose text-gray-500 ${className}`}>{children}</small>
)

// Label
export const Label = ({ children, className = "" }) => (
    <label className={`text-sm font-semibold text-gray-800 ${className}`}>{children}</label>
)

// Link text
export const Link = ({ children, className = "" }) => (
    <span className={`text-base font-semibold text-blue-600 hover:text-blue-800 cursor-pointer ${className}`}>
        {children}
    </span>
)

// Highlight text
export const Highlight = ({ children, className = "" }) => (
    <span className={`font-bold text-gray-900 ${className}`}>{children}</span>
)
