export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
};

export const notFound = (req, res) => {
    res.status(404).json({ error: 'Route not found' });
};