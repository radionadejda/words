export const handleCancel = parameters => {
    const { setFormData, setFormType, foreignWord, transcription, russian, tags } = parameters;
    setFormData({
        word: foreignWord || '',
        transcription: transcription || '',
        translation: russian || '',
        tags: tags || ''
    });
    setFormType(null);
};
