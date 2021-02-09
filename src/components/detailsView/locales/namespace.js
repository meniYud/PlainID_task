const currentNamespace = 'generalDetails';

const intT = (key) => {
    const {t} = global;
    return t(`${currentNamespace}:${key}`);
}

export {currentNamespace, intT};