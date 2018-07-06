package org.efire.net.service;

import org.efire.net.domain.OrderEntry;
import org.efire.net.repository.OrderEntryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing OrderEntry.
 */
@Service
@Transactional
public class OrderEntryService {

    private final Logger log = LoggerFactory.getLogger(OrderEntryService.class);

    private final OrderEntryRepository orderEntryRepository;

    public OrderEntryService(OrderEntryRepository orderEntryRepository) {
        this.orderEntryRepository = orderEntryRepository;
    }

    /**
     * Save a orderEntry.
     *
     * @param orderEntry the entity to save
     * @return the persisted entity
     */
    public OrderEntry save(OrderEntry orderEntry) {
        log.debug("Request to save OrderEntry : {}", orderEntry);        return orderEntryRepository.save(orderEntry);
    }

    /**
     * Get all the orderEntries.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<OrderEntry> findAll() {
        log.debug("Request to get all OrderEntries");
        return orderEntryRepository.findAll();
    }


    /**
     * Get one orderEntry by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<OrderEntry> findOne(Long id) {
        log.debug("Request to get OrderEntry : {}", id);
        return orderEntryRepository.findById(id);
    }

    /**
     * Delete the orderEntry by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete OrderEntry : {}", id);
        orderEntryRepository.deleteById(id);
    }
}
