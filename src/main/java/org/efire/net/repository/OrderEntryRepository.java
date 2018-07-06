package org.efire.net.repository;

import org.efire.net.domain.OrderEntry;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrderEntry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderEntryRepository extends JpaRepository<OrderEntry, Long> {

}
