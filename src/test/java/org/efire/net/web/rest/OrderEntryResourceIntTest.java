package org.efire.net.web.rest;

import org.efire.net.SimpleServiceOrderApp;

import org.efire.net.domain.OrderEntry;
import org.efire.net.repository.OrderEntryRepository;
import org.efire.net.service.OrderEntryService;
import org.efire.net.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static org.efire.net.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.efire.net.domain.enumeration.ServiceType;
import org.efire.net.domain.enumeration.PaymentStatus;
/**
 * Test class for the OrderEntryResource REST controller.
 *
 * @see OrderEntryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SimpleServiceOrderApp.class)
public class OrderEntryResourceIntTest {

    private static final ServiceType DEFAULT_SERVICE_TYPE = ServiceType.PICKUP_DELIVERY;
    private static final ServiceType UPDATED_SERVICE_TYPE = ServiceType.DROPOFF;

    private static final LocalDate DEFAULT_TRANSACTION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TRANSACTION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final BigDecimal DEFAULT_TOTAL_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL_AMOUNT = new BigDecimal(2);

    private static final PaymentStatus DEFAULT_PAYMENT_STATUS = PaymentStatus.PAID;
    private static final PaymentStatus UPDATED_PAYMENT_STATUS = PaymentStatus.UNPAID;

    @Autowired
    private OrderEntryRepository orderEntryRepository;

    

    @Autowired
    private OrderEntryService orderEntryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrderEntryMockMvc;

    private OrderEntry orderEntry;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderEntryResource orderEntryResource = new OrderEntryResource(orderEntryService);
        this.restOrderEntryMockMvc = MockMvcBuilders.standaloneSetup(orderEntryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrderEntry createEntity(EntityManager em) {
        OrderEntry orderEntry = new OrderEntry()
            .serviceType(DEFAULT_SERVICE_TYPE)
            .transactionDate(DEFAULT_TRANSACTION_DATE)
            .totalAmount(DEFAULT_TOTAL_AMOUNT)
            .paymentStatus(DEFAULT_PAYMENT_STATUS);
        return orderEntry;
    }

    @Before
    public void initTest() {
        orderEntry = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderEntry() throws Exception {
        int databaseSizeBeforeCreate = orderEntryRepository.findAll().size();

        // Create the OrderEntry
        restOrderEntryMockMvc.perform(post("/api/order-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEntry)))
            .andExpect(status().isCreated());

        // Validate the OrderEntry in the database
        List<OrderEntry> orderEntryList = orderEntryRepository.findAll();
        assertThat(orderEntryList).hasSize(databaseSizeBeforeCreate + 1);
        OrderEntry testOrderEntry = orderEntryList.get(orderEntryList.size() - 1);
        assertThat(testOrderEntry.getServiceType()).isEqualTo(DEFAULT_SERVICE_TYPE);
        assertThat(testOrderEntry.getTransactionDate()).isEqualTo(DEFAULT_TRANSACTION_DATE);
        assertThat(testOrderEntry.getTotalAmount()).isEqualTo(DEFAULT_TOTAL_AMOUNT);
        assertThat(testOrderEntry.getPaymentStatus()).isEqualTo(DEFAULT_PAYMENT_STATUS);
    }

    @Test
    @Transactional
    public void createOrderEntryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderEntryRepository.findAll().size();

        // Create the OrderEntry with an existing ID
        orderEntry.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderEntryMockMvc.perform(post("/api/order-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEntry)))
            .andExpect(status().isBadRequest());

        // Validate the OrderEntry in the database
        List<OrderEntry> orderEntryList = orderEntryRepository.findAll();
        assertThat(orderEntryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkServiceTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderEntryRepository.findAll().size();
        // set the field null
        orderEntry.setServiceType(null);

        // Create the OrderEntry, which fails.

        restOrderEntryMockMvc.perform(post("/api/order-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEntry)))
            .andExpect(status().isBadRequest());

        List<OrderEntry> orderEntryList = orderEntryRepository.findAll();
        assertThat(orderEntryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTransactionDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderEntryRepository.findAll().size();
        // set the field null
        orderEntry.setTransactionDate(null);

        // Create the OrderEntry, which fails.

        restOrderEntryMockMvc.perform(post("/api/order-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEntry)))
            .andExpect(status().isBadRequest());

        List<OrderEntry> orderEntryList = orderEntryRepository.findAll();
        assertThat(orderEntryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTotalAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderEntryRepository.findAll().size();
        // set the field null
        orderEntry.setTotalAmount(null);

        // Create the OrderEntry, which fails.

        restOrderEntryMockMvc.perform(post("/api/order-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEntry)))
            .andExpect(status().isBadRequest());

        List<OrderEntry> orderEntryList = orderEntryRepository.findAll();
        assertThat(orderEntryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrderEntries() throws Exception {
        // Initialize the database
        orderEntryRepository.saveAndFlush(orderEntry);

        // Get all the orderEntryList
        restOrderEntryMockMvc.perform(get("/api/order-entries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderEntry.getId().intValue())))
            .andExpect(jsonPath("$.[*].serviceType").value(hasItem(DEFAULT_SERVICE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].transactionDate").value(hasItem(DEFAULT_TRANSACTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].totalAmount").value(hasItem(DEFAULT_TOTAL_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].paymentStatus").value(hasItem(DEFAULT_PAYMENT_STATUS.toString())));
    }
    

    @Test
    @Transactional
    public void getOrderEntry() throws Exception {
        // Initialize the database
        orderEntryRepository.saveAndFlush(orderEntry);

        // Get the orderEntry
        restOrderEntryMockMvc.perform(get("/api/order-entries/{id}", orderEntry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderEntry.getId().intValue()))
            .andExpect(jsonPath("$.serviceType").value(DEFAULT_SERVICE_TYPE.toString()))
            .andExpect(jsonPath("$.transactionDate").value(DEFAULT_TRANSACTION_DATE.toString()))
            .andExpect(jsonPath("$.totalAmount").value(DEFAULT_TOTAL_AMOUNT.intValue()))
            .andExpect(jsonPath("$.paymentStatus").value(DEFAULT_PAYMENT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingOrderEntry() throws Exception {
        // Get the orderEntry
        restOrderEntryMockMvc.perform(get("/api/order-entries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderEntry() throws Exception {
        // Initialize the database
        orderEntryService.save(orderEntry);

        int databaseSizeBeforeUpdate = orderEntryRepository.findAll().size();

        // Update the orderEntry
        OrderEntry updatedOrderEntry = orderEntryRepository.findById(orderEntry.getId()).get();
        // Disconnect from session so that the updates on updatedOrderEntry are not directly saved in db
        em.detach(updatedOrderEntry);
        updatedOrderEntry
            .serviceType(UPDATED_SERVICE_TYPE)
            .transactionDate(UPDATED_TRANSACTION_DATE)
            .totalAmount(UPDATED_TOTAL_AMOUNT)
            .paymentStatus(UPDATED_PAYMENT_STATUS);

        restOrderEntryMockMvc.perform(put("/api/order-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderEntry)))
            .andExpect(status().isOk());

        // Validate the OrderEntry in the database
        List<OrderEntry> orderEntryList = orderEntryRepository.findAll();
        assertThat(orderEntryList).hasSize(databaseSizeBeforeUpdate);
        OrderEntry testOrderEntry = orderEntryList.get(orderEntryList.size() - 1);
        assertThat(testOrderEntry.getServiceType()).isEqualTo(UPDATED_SERVICE_TYPE);
        assertThat(testOrderEntry.getTransactionDate()).isEqualTo(UPDATED_TRANSACTION_DATE);
        assertThat(testOrderEntry.getTotalAmount()).isEqualTo(UPDATED_TOTAL_AMOUNT);
        assertThat(testOrderEntry.getPaymentStatus()).isEqualTo(UPDATED_PAYMENT_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderEntry() throws Exception {
        int databaseSizeBeforeUpdate = orderEntryRepository.findAll().size();

        // Create the OrderEntry

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderEntryMockMvc.perform(put("/api/order-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderEntry)))
            .andExpect(status().isBadRequest());

        // Validate the OrderEntry in the database
        List<OrderEntry> orderEntryList = orderEntryRepository.findAll();
        assertThat(orderEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrderEntry() throws Exception {
        // Initialize the database
        orderEntryService.save(orderEntry);

        int databaseSizeBeforeDelete = orderEntryRepository.findAll().size();

        // Get the orderEntry
        restOrderEntryMockMvc.perform(delete("/api/order-entries/{id}", orderEntry.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderEntry> orderEntryList = orderEntryRepository.findAll();
        assertThat(orderEntryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderEntry.class);
        OrderEntry orderEntry1 = new OrderEntry();
        orderEntry1.setId(1L);
        OrderEntry orderEntry2 = new OrderEntry();
        orderEntry2.setId(orderEntry1.getId());
        assertThat(orderEntry1).isEqualTo(orderEntry2);
        orderEntry2.setId(2L);
        assertThat(orderEntry1).isNotEqualTo(orderEntry2);
        orderEntry1.setId(null);
        assertThat(orderEntry1).isNotEqualTo(orderEntry2);
    }
}
