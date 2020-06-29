export const getEnergySources = store => store.energy_sources;

export const getEnergySourcesFiltered = (store, filter) => {
    const energySources = getEnergySources();
    switch (filter) {
        case VISIBILITY_FILTERS.COMPLETED:
            return energySources.filter(todo => todo.completed);
        case VISIBILITY_FILTERS.INCOMPLETE:
            return energySources.filter(todo => !todo.completed);
        case VISIBILITY_FILTERS.ALL:
        default:
            return allTodos;
    }
};