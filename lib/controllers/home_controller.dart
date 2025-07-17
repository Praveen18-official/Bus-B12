import 'package:get/get.dart';
import '../models/product.dart';
import '../services/api_service.dart';

class HomeController extends GetxController {
  var isLoading = true.obs;
  var productList = <Product>[].obs;
  var error = ''.obs;

  @override
  void onInit() {
    super.onInit();
    fetchProducts();
  }

  Future<void> fetchProducts() async {
    try {
      isLoading(true);
      final products = await ApiService.fetchProducts();
      productList.value = products;
      error('');
    } catch (e) {
      error(e.toString());
      Get.snackbar(
        'Error',
        'Failed to load products: $e',
        snackPosition: SnackPosition.BOTTOM,
      );
    } finally {
      isLoading(false);
    }
  }

  void refreshProducts() {
    fetchProducts();
  }
}
